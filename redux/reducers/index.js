// index.js
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import language from './language';

import apiTest, { doGetEpic, doPostEpic } from '../../api/apiTest';
import socialLogin from './socialLogin';
import { signInFacebookEpic, signInGoogleEpic, getFacebookProfileEpic } from '../actions/socialLogin';

export const rootReducer = combineReducers({
  language,
  apiTest,
  socialLogin
})

export const rootEpic = combineEpics(
  doGetEpic,
  doPostEpic,
  signInFacebookEpic,
  signInGoogleEpic,
  getFacebookProfileEpic,
)
