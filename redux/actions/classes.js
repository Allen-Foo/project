// classes.js
import {
  CREATE_CLASS,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAIL,
  UPDATE_CLASS,
  GET_CLASS_DETAIL,
  GET_CLASS_DETAIL_SUCCESS,
  GET_CLASS_DETAIL_FAIL,
} from '../types';

import { Observable } from 'rxjs/Observable';


export function createClass(cls) {
  return {
    type: CREATE_CLASS,
    payload: cls
  };
}

// TODO current user id is hardcode
export function getClassList(userId = 'testid') {
  return {
    type: GET_CLASS_LIST,
    payload: {
      userId
    }
  }
}

export function updateClass(params) {
  return {
    type: UPDATE_CLASS,
    payload: params
  }
}

export function getClassDetail(classId) {
  return {
    type: GET_CLASS_DETAIL,
    payload: classId
  }
}

// this epic will create a class at dynamoDb
export const createClassEpic = (action$, store, { request }) =>
  action$.ofType(CREATE_CLASS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/createClass',
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        return {
          type: CREATE_CLASS_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: CREATE_CLASS_FAIL,
        payload: err.message
      }))
    )


// this epic will create a class at dynamoDb
export const getClassListEpic = (action$, store, { request }) =>
  action$.ofType(GET_CLASS_LIST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getClassList',
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        console.warn('GET_CLASS_LIST success', res.data)
        return {
          type: GET_CLASS_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_CLASS_LIST_FAIL,
        payload: err.message
      }))
    )

export const getClassDetailEpic = (action$, store, { request }) =>
  action$.ofType(GET_CLASS_DETAIL)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/getClassDetail/${action.payload}`,
        method: 'post', 
      }))
      .map(res => {
        return {
          type: GET_CLASS_DETAIL_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_CLASS_DETAIL_FAIL,
        payload: err.message
      }))
    )
