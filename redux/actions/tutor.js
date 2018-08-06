import {
  SET_TUTORPROFILE,
  SET_SELFINTRO,
  SET_PROFESSION,
  SET_EXPERIENCE,
  SET_ACHIEVEMENT,
  CLEAR_TUTORPROFILE,
  GET_TUTOR_DETAIL,
  GET_TUTOR_DETAIL_SUCCESS,
  GET_TUTOR_DETAIL_FAIL,
  GET_REVENUE,
  GET_REVENUE_SUCCESS,
  GET_REVENUE_FAIL,
  WITHDRAW_MONEY,
  WITHDRAW_MONEY_SUCCESS,
  WITHDRAW_MONEY_FAIL,
  GET_WITHDRAW_RECORD,
  GET_WITHDRAW_RECORD_SUCCESS,
  GET_WITHDRAW_RECORD_FAIL,
} from '../types'
import AWS from 'aws-sdk';
import { Observable } from 'rxjs/Observable';

import { ServerErrorCode } from '../../constants/ServerErrorCode'


export function setTutorProfile(profile) {
  return {
    type: SET_TUTORPROFILE,
    payload: profile
  };
}

export function setSelfIntro(selfIntro) {
  return {
    type: SET_SELFINTRO,
    payload: selfIntro
  };
}

export function setProfession(profession) {
	return {
    type: SET_PROFESSION,
    payload: profession
  };
}

export function setExperience(experience) {
	return {
    type: SET_EXPERIENCE,
    payload: experience
  };
}

export function setAchievement(achievementList) {
  return {
    type: SET_ACHIEVEMENT,
    payload: achievementList
  };
}

export function clearTutorProfile () {
  return {
    type: CLEAR_TUTORPROFILE,
  };
}

export function getTutorDetail (tutorId) {
  return {
    type: GET_TUTOR_DETAIL,
    payload: tutorId,
  }
}

export function getRevenue (userId, userRole) {
  return {
    type: GET_REVENUE,
    payload: {userId,userRole}
  }
}

export function withdrawMoney (data) {
  return {
    type: WITHDRAW_MONEY,
    payload: data,
  }
}

export function getWithdrawRecord (userId, lastRecordId) {
  return {
    type: GET_WITHDRAW_RECORD,
    payload: {userId, lastRecordId},
  }
}


export const getTutorDeatilEpic = (action$, store, { request }) =>
  action$.ofType(GET_TUTOR_DETAIL)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/getTutorDetail',
        data: {
          tutorId: action.payload
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: GET_TUTOR_DETAIL_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_TUTOR_DETAIL_FAIL,
        payload: err
      }))
    )

export const getRevenueEpic = (action$, store, { request }) =>
  action$.ofType(GET_REVENUE)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/getWalletRevenue',
        data: {
          userId: action.payload.userId,
          userRole: action.payload.userRole,
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: GET_REVENUE_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_REVENUE_FAIL,
        payload: err
      }))
    )

export const withdrawMoneyEpic = (action$, store, { request }) =>
  action$.ofType(WITHDRAW_MONEY)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/applyWithdrawn',
        data: {
          userId: store.getState().userProfile.user.userId,
          bankAccountName: action.payload.bankAccountName,
          bankName: action.payload.bankName,
          bankAccount: action.payload.bankAccount,
          amount: action.payload.amount,
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: WITHDRAW_MONEY_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: WITHDRAW_MONEY_FAIL,
        payload: err
      }))
    )

export const getWithdrawRecordEpic = (action$, store, { request }) =>
  action$.ofType(GET_WITHDRAW_RECORD)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/getWithdrawnRecord',
        data: {
          userId: action.payload.userId,
          lastStartKey: action.payload.lastRecordId,
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: GET_WITHDRAW_RECORD_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_WITHDRAW_RECORD_FAIL,
        payload: err
      }))
    )
    
