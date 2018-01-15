// index.js
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import language from './language';
import appType from './appType';

import apiTest, { doGetEpic, doPostEpic } from '../../api/apiTest';
import socialLogin from './socialLogin';
import {
  registerEpic,
  signInEmailEpic,
  signUpEmailEpic,
  verifyCodeEpic,
  signInFacebookEpic,
  signInGoogleEpic,
  getFacebookProfileEpic,
  getFacebookPictureEpic,
  loginEpic,
  getIdentityIdEpic,
} from '../actions/socialLogin';

export const rootReducer = combineReducers({
  language,
  apiTest,
  appType,
  socialLogin
})

export const rootEpic = combineEpics(
  doGetEpic,
  doPostEpic,
  signInFacebookEpic,
  signInGoogleEpic,
  getFacebookProfileEpic,
  getFacebookPictureEpic,
  signInEmailEpic,
  signUpEmailEpic,
  verifyCodeEpic,
  registerEpic,
  loginEpic,
  getIdentityIdEpic,
)
