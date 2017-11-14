import appSecrets from '../appSecrets';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import * as types from '../redux/types';

const DO_GET = 'DO_GET';
const DO_GET_SUCCESS = 'DO_GET_SUCCESS';
const DO_GET_FAIL = 'DO_GET_FAIL';

export const doPost = (service, userInfo) => {
  return axios.post(appSecrets.aws.apiURL, {
      'bodyParam1': `you sent me to the server, and now I'm back!`,
    })
    .then((response) => {
      if (response.status !== 200) {
        console.warn('error', response.status)
      }
      else {
        console.warn('response', response.data.message)
        return response.data.message;
      }
    })
    .catch(function (err) {   
      console.log("error: ", err);
    })
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
    default:
      return defaultState
  }
}