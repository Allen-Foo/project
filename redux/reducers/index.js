// index.js
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import language from './language';
import appType from './appType';
import classes from './classes';
import userProfile from './userProfile';
import socialLogin from './socialLogin';
import filter from './filter';
import tutor from './tutor'

import apiTest, { doGetEpic, doPostEpic } from '../../api/apiTest';
import {
  registerEpic,
  signInEmailEpic,
  signUpEmailEpic,
  validateNewUserInfoEpic,
  verifyCodeEpic,
  resendCodeEpic,
  signInFacebookEpic,
  signInGoogleEpic,
  getFacebookProfileEpic,
  getFacebookPictureEpic,
  loginEpic,
  getIdentityIdEpic,
  updateAvatarEpic,
  updateProfileEpic,
  addToBookmarkEpic,
  removeFromBookmarkEpic,
  requireUpdateClassListEpic,
  getAppliedClassListEpic,
  createTutorEpic,
  getTutorListEpic,
  deleteTutorEpic,
  updateTutorEpic,
} from '../actions/socialLogin';

import {
  getTutorDeatilEpic,
} from '../actions/tutor'

import {
  createClassEpic,
  updateClassEpic,
  getClassListEpic,
  getClassDetailEpic,
  deleteClassEpic,
  getAllClassListEpic,
  giveCommentEpic,
  getFavouriteClassListEpic,
  applyClassEpic,
  duplicateClassEpic,
} from '../actions/classes';

import {
  searchClassListEpic,
} from '../actions/filter';

export const rootReducer = combineReducers({
  language,
  apiTest,
  appType,
  classes,
  socialLogin,
  userProfile,
  filter,
  tutor,
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
  validateNewUserInfoEpic,
  verifyCodeEpic,
  resendCodeEpic,
  registerEpic,
  loginEpic,
  getIdentityIdEpic,
  createClassEpic,
  updateClassEpic,
  getClassListEpic,
  getClassDetailEpic,
  getAllClassListEpic,
  getFavouriteClassListEpic,
  updateAvatarEpic,
  updateProfileEpic,
  deleteClassEpic,
  addToBookmarkEpic,
  removeFromBookmarkEpic,
  giveCommentEpic,
  requireUpdateClassListEpic,
  applyClassEpic,
  getAppliedClassListEpic,
  searchClassListEpic,
  duplicateClassEpic,
  createTutorEpic,
  getTutorListEpic,
  deleteTutorEpic,
  updateTutorEpic,
  getTutorDeatilEpic
)
