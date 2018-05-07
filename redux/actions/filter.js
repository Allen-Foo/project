import {
  SET_KEYWORD,
  SET_ADDRESS,
  SET_FILTER,
  SET_SORT,
  SEARCH_CLASS_LIST,
  SEARCH_CLASS_LIST_FAIL,
  SEARCH_CLASS_LIST_SUCCESS,
  SET_CURRENT_LOCATION,
} from '../types'

import { Observable } from 'rxjs/Observable';

export function setKeyword(keyword) {
  return {
    type: SET_KEYWORD,
    payload: keyword
  };
}

export function setAddress(address, isCurrentLocationSelected = false) {
  return {
    type: SET_ADDRESS,
    payload: {
      address,
      isCurrentLocationSelected
    }
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
}

export function setSort(sort) {
  return {
    type: SET_SORT,
    payload: sort
  };
}

export function setCurrentLocation(location) {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location
  }
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
          keyword: store.getState().filter.keyword,
          filter: store.getState().filter.filter,
          sort: store.getState().filter.sort,
        }
      }))
      .map(res => {
        // console.warn('SEARCH_CLASS_LIST success', res.data.classList)
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
      