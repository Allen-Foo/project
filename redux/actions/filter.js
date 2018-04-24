import {
  SET_KEYWORD,
  SET_ADDRESS,
  SET_FILTER,
  SEARCH_CLASS_LIST,
  SEARCH_CLASS_LIST_FAIL,
  SEARCH_CLASS_LIST_SUCCESS,
} from '../types'

import { Observable } from 'rxjs/Observable';

export function setKeyword(keyword) {
  return {
    type: SET_KEYWORD,
    payload: keyword
  };
}

export function setAddress(address) {
  return {
    type: SET_ADDRESS,
    payload: address
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
}

export function searchClassList() {
  return {
    type: SEARCH_CLASS_LIST
  }
}

export const searchClassListEpic = (action$, store, { request }) =>
  action$.ofType(SEARCH_CLASS_LIST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/searchClassList',
        method: 'post',
        data: {
          address: store.getState().filter.address,
          keyword: store.getState().filter.keyword,
          filter: store.getState().filter.filter,
          sort: store.getState().filter.sort,
        }
      }))
      .map(res => {
        console.warn('SEARCH_CLASS_LIST success', res.data.classList)
        return {
          type: SEARCH_CLASS_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: SEARCH_CLASS_LIST_FAIL,
        payload: err.message
      }))
    )
      