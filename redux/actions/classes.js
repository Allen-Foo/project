// classes.js
import {
  CREATE_CLASS,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
} from '../types';

import { Observable } from 'rxjs/Observable';


export function createClass(cls) {
  return {
    type: 'CREATE_CLASS',
    payload: cls
  };
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
        console.warn('CREATE_CLASS success', res.data)
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
