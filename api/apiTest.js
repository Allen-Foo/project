import appSecrets from '../appSecrets';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import * as types from '../redux/types';

const DO_GET = 'DO_GET';
const DO_GET_SUCCESS = 'DO_GET_SUCCESS';
const DO_GET_FAIL = 'DO_GET_FAIL';

const DO_POST = 'DO_POST';
const DO_POST_SUCCESS = 'DO_POST_SUCCESS';
const DO_POST_FAIL = 'DO_POST_FAIL';


export const doPost = (service, userInfo) => {
  return {
    type: DO_POST
  }
}

export const doGet = (service, userInfo) => {
  // console.warn('doGet')
  return {
    type: DO_GET
  }
}


export const doGetEpic = (action$, store, { request }) =>
  action$.ofType(DO_GET)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'get',
      }))
      .map(res => {
        return {
          type: DO_GET_SUCCESS,
          payload: res.data.message
        }
      })
      .catch(error => Observable.of({
        type: DO_GET_FAIL,
        payload: error,
        error: true,
      })),
    )

export const doPostEpic = (action$, store, { request }) =>
  action$.ofType(DO_POST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        data: {
          bodyParam1: "you sent me to the server, and now I'm back!",
        }
      }))
      .map(res => {
        return {
          type: DO_POST_SUCCESS,
          payload: res.data.message
        }
      })
      .catch(error => Observable.of({
        type: DO_POST_FAIL,
        payload: error,
        error: true,
      })),
    )

const defaultState = {
  isFetching: false,
  message: null,
}

// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case DO_GET:
      // console.warn('here', 'DO_GET')
      return {
        ...state,
        isFetching: true,
        message: null
      };
    case DO_GET_SUCCESS:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        isFetching: false,
        message: action.payload
      }
    case DO_GET_FAIL:
      // console.warn('here', 'DO_GET_FAIL')
      return {
        ...state,
        isFetching: false,
      }
    case DO_POST:
      // console.warn('here', 'DO_POST')
      return {
        ...state,
        isFetching: true,
        message: null
      };
    case DO_POST_SUCCESS:
      // console.warn('here', 'DO_POST_SUCCESS', action.payload)
      return {
        ...state,
        isFetching: false,
        message: action.payload
      }
    case DO_POST_FAIL:
      // console.warn('here', 'DO_POST_FAIL')
      return {
        ...state,
        isFetching: false,
      }
    default:
      return defaultState
  }
}