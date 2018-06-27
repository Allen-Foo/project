import { setLanguage } from './setLanguage';
import { setAppType } from './setAppType';
import {
  createClass,
  getClassList,
  getMoreClassList,
  updateClass,
  editClass,
  getClassDetail,
  deleteClass,
  getAllClassList,
  giveComment,
  getFavouriteClassList,
  applyClass,
  duplicateClass,
  renewAppliedClass,
} from './classes';

import {
  signInEmail,
  signInFacebook,
  signInGoogle,
  signOut,
  signUp,
  signUpSuccess,
  signUpFail,
  validateNewUserInfo,
  verifyCode,
  resendCode,
  verifyCodeCancel,
  updateAvatar,
  updateProfile,
  addToBookmark,
  removeFromBookmark,
  getAppliedClassList,
  createTutor,
  getTutorList,
  deleteTutor,
  updateTutor,
} from './socialLogin';

import {
  setKeyword,
  setAddress,
  setFilter,
  setSort,
  setCurrentLocation,
  searchClassList,
} from './filter';

import {
  setTutorProfile,
  setSelfIntro,
  setProfession,
  setExperience,
  setAchievement,
  clearTutorProfile,
  getTutorDetail,
} from './tutor'

import {
  getProductList,
  purchaseGold,
} from './product'

import {
  setCompanyProfile,
} from './company'

export {
  setLanguage,
  setAppType,
  signInFacebook,
  signInGoogle,
  signInEmail,
  signOut,
  signUp,
  signUpSuccess,
  signUpFail,
  validateNewUserInfo,
  verifyCode,
  resendCode,
  verifyCodeCancel,
  createClass,
  getClassList,
  getMoreClassList,
  updateClass,
  editClass,
  deleteClass,
  getClassDetail,
  getAllClassList,
  getFavouriteClassList,
  updateAvatar,
  updateProfile,
  addToBookmark,
  removeFromBookmark,
  giveComment,
  applyClass,
  getAppliedClassList,
  setKeyword,
  setAddress,
  searchClassList,
  setFilter,
  setSort,
  duplicateClass,
  setCurrentLocation,
  setTutorProfile,
  setSelfIntro,
  setProfession,
  setExperience,
  setAchievement,
  clearTutorProfile,
  getTutorDetail,
  renewAppliedClass,
  createTutor,
  getTutorList,
  deleteTutor,
  updateTutor,
  getProductList,
  purchaseGold,

  // company
  setCompanyProfile,
}