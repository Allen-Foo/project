// classes.js
import {
  CREATE_CLASS,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAIL,
  EDIT_CLASS,
  GET_CLASS_DETAIL,
  GET_CLASS_DETAIL_SUCCESS,
  GET_CLASS_DETAIL_FAIL,
  UPDATE_CLASS,
  UPDATE_CLASS_SUCCESS,
  UPDATE_CLASS_FAIL,
  DELETE_CLASS,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAIL,
  GET_ALL_CLASS_LIST,
  GET_ALL_CLASS_LIST_SUCCESS,
  GET_ALL_CLASS_LIST_FAIL,
  GIVE_COMMENT,
  GIVE_COMMENT_SUCCESS,
  GIVE_COMMENT_FAIL,
  GET_FAVOURITE_CLASS_LIST,
  GET_FAVOURITE_CLASS_LIST_FAIL,
  GET_FAVOURITE_CLASS_LIST_SUCCESS,
  APPLY_CLASS,
  APPLY_CLASS_SUCCESS,
  APPLY_CLASS_FAIL,
  DUPLICATE_CLASS,
  DUPLICATE_CLASS_SUCCESS,
  DUPLICATE_CLASS_FAIL,
  RENEW_APPLIED_CLASSLIST,
} from '../types';

import { Observable } from 'rxjs/Observable';


export function createClass(cls) {
  return {
    type: CREATE_CLASS,
    payload: cls
  };
}

// TODO current user id is hardcode
export function getClassList(userId = 'testid', lastClassId) {
  return {
    type: GET_CLASS_LIST,
    payload: {
      userId,
      lastStartKey: lastClassId,
    }
  }
}

// this is for local use,
// only edit class temporarily
export function editClass(params) {
  return {
    type: EDIT_CLASS,
    payload: params
  }
}

// this will update the class info in the dynamoDb
export function updateClass(newClass) {
  return {
    type: UPDATE_CLASS,
    payload: newClass
  }
}

export function deleteClass(cls) {
  return {
    type: DELETE_CLASS,
    payload: cls
  }
}

export function duplicateClass(cls) {
  return {
    type: DUPLICATE_CLASS,
    payload: cls
  }
}

export function getClassDetail(classId) {
  return {
    type: GET_CLASS_DETAIL,
    payload: classId
  }
}

export function getAllClassList(lastClassId) {
  return {
    type: GET_ALL_CLASS_LIST,
    payload: {
      lastStartKey: lastClassId
    }
  }
}

export function searchClassList(filter) {
  // console.warn('searchClassList', filter)
  return {
    type: SEARCH_CLASS_LIST,
    payload: filter
  }
}

export const giveComment = (comment, classId) => {
  return {
    type: GIVE_COMMENT,
    payload: {
      comment,
      classId
    }
  }
}

export function getFavouriteClassList(classIds) {
  // console.warn('searchClassList', filter)
  return {
    type: GET_FAVOURITE_CLASS_LIST,
    payload: classIds
  }
}

export function applyClass(classId, userId) {
  return {
    type: APPLY_CLASS,
    payload: {
      classId,
      userId,
    }
  }
}

export function renewAppliedClass() {
  return {
    type: RENEW_APPLIED_CLASSLIST,
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

export const updateClassEpic = (action$, store, { request }) =>
  action$.ofType(UPDATE_CLASS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/updateClass/${action.payload.classId}`,
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        return {
          type: UPDATE_CLASS_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: UPDATE_CLASS_FAIL,
        payload: err.message
      }))
    )

export const deleteClassEpic = (action$, store, { request }) =>
  action$.ofType(DELETE_CLASS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/deleteClass/${action.payload.classId}`,
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        return {
          type: DELETE_CLASS_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: DELETE_CLASS_FAIL,
        payload: err.message
      }))
    )

export const duplicateClassEpic = (action$, store, { request }) =>
  action$.ofType(DUPLICATE_CLASS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/duplicateClass/${action.payload.classId}`,
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        return {
          type: DUPLICATE_CLASS_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: DUPLICATE_CLASS_FAIL,
        payload: err.message
      }))
    )


// this epic will create a class at dynamoDb
export const getClassListEpic = (action$, store, { request }) =>
  action$.ofType(GET_CLASS_LIST, CREATE_CLASS_SUCCESS, UPDATE_CLASS_SUCCESS, DELETE_CLASS_SUCCESS, DUPLICATE_CLASS_SUCCESS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getClassList',
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        // console.warn('GET_CLASS_LIST success', res.data)
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
        // console.warn('GET_CLASS_DETAIL_SUCCESS', res.data)
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

export const getAllClassListEpic = (action$, store, { request }) =>
  action$.ofType(GET_ALL_CLASS_LIST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getAllClassList',
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        //console.warn('GET_ALL_CLASS_LIST success', res.data.classList)
        return {
          type: GET_ALL_CLASS_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_ALL_CLASS_LIST_FAIL,
        payload: err.message
      }))
    )

export const giveCommentEpic = (action$, store, { request }) =>
  action$.ofType(GIVE_COMMENT)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: `/giveComment/${action.payload.classId}`,
        data: {
          comment: action.payload.comment,
          userId: store.getState().socialLogin.user.userId,
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: GIVE_COMMENT_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_FAVOURITE_CLASS_LIST_FAIL,
        payload: err.message
      }))
    )

export const getFavouriteClassListEpic = (action$, store, { request }) =>
  action$.ofType(GET_FAVOURITE_CLASS_LIST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getFavouriteClassList',
        method: 'post',
        data: action.payload
      }))
      .map(res => {
        // console.warn('getFavouriteClassListEpic success', res.data)
        return {
          type: GET_FAVOURITE_CLASS_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_FAVOURITE_CLASS_LIST_FAIL,
        payload: err.message
      }))
    )

export const applyClassEpic = (action$, store, { request }) =>
  action$.ofType(APPLY_CLASS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/applyClass/${action.payload.classId}`,
        method: 'post',
        data: {
          userId: action.payload.userId,
        }
      }))
      .map(res => {
        return {
          type: APPLY_CLASS_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: APPLY_CLASS_FAIL,
        payload: err.message
      }))
    )
