// index.js
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import language from './language';
import appType from './appType';
import classes from './classes';
import socialLogin from './socialLogin';

import apiTest, { doGetEpic, doPostEpic } from '../../api/apiTest';
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
  updateAvatarEpic,
} from '../actions/socialLogin';

import {
  createClassEpic,
  getClassListEpic,
} from '../actions/classes';

export const rootReducer = combineReducers({
  language,
  apiTest,
  appType,
  classes,
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
  createClassEpic,
  getClassListEpic,
  updateAvatarEpic,
)
