import {
  SET_COMPANY_PROFILE,
  SET_COMPANY_DISPALY_NAME,
  SET_COMPANY_INTRODUCTION,
  SET_COMPANY_LOGO,
  SET_COMPANY_SLOGAN,
  SET_COMPANY_BANNER,

  GET_COMPANY_DETAIL,
  GET_COMPANY_DETAIL_SUCCESS,
  GET_COMPANY_DETAIL_FAIL,

  CLEAR_COMPANY_PROFILE,
} from '../types'
import AWS from 'aws-sdk';
import { Observable } from 'rxjs/Observable';

import { ServerErrorCode } from '../../constants/ServerErrorCode'


export function setCompanyProfile(profile) {
  return {
    type: SET_COMPANY_PROFILE,
    payload: profile
  };
}

export function setCompanyDisplayName(name) {
  return {
    type: SET_COMPANY_DISPALY_NAME,
    payload: name
  };
}

export function setCompanyIntroduction(introduction) {
  return {
    type: SET_COMPANY_INTRODUCTION,
    payload: introduction
  };
}

export function setCompanyLogo(logo) {
  return {
    type: SET_COMPANY_LOGO,
    payload: logo
  }; 
}

export function setCompanySlogan(slogan) {
  return {
    type: SET_COMPANY_SLOGAN,
    payload: slogan
  };
}

export function setCompanyBanner(banner) {
  return {
    type: SET_COMPANY_BANNER,
    payload: banner
  };
}

export function getCompanyDetail(companyId) {
  return {
    type: GET_COMPANY_DETAIL,
    payload: companyId
  }
}

// use to clear company profile, avoid cached in redux store
export function clearCompanyProfile () {
  return {
    type: CLEAR_COMPANY_PROFILE,
  };
}

// this epic will sign in user through AWS Cognito
export const getCompanyDetailEpic = (action$, store, { request }) =>
  action$.ofType(GET_COMPANY_DETAIL)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/getCompanyDetail',
        data: {
          companyId: action.payload
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: GET_COMPANY_DETAIL_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_COMPANY_DETAIL_FAIL,
        payload: err
      }))
    )