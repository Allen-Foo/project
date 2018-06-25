import {
  SET_TUTORPROFILE,
  SET_SELFINTRO,
  SET_PROFESSION,
  SET_EXPERIENCE,
  SET_ACHIEVEMENT,
  CLEAR_TUTORPROFILE,
  GET_TUTOR_DETAIL,
  GET_TUTOR_DETAIL_SUCCESS,
  GET_TUTOR_DETAIL_FAIL
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

export function setAchievement(achievement) {
  return {
    type: SET_ACHIEVEMENT,
    payload: achievement
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

// this epic will sign in user through AWS Cognito
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