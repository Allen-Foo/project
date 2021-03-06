// socialLogin.js
import {
  SIGN_IN_EMAIL,
  SIGN_IN_EMAIL_SUCCESS,
  SIGN_IN_EMAIL_FAIL,
  SIGN_IN_FACEBOOK,
  SIGN_IN_FACEBOOK_SUCCESS,
  SIGN_IN_FACEBOOK_FAIL,
  GET_FACEBOOK_PROFILE,
  GET_FACEBOOK_PROFILE_SUCCESS,
  GET_FACEBOOK_PROFILE_FAIL,
  GET_FACEBOOK_PICTURE,
  GET_FACEBOOK_PICTURE_SUCCESS,
  GET_FACEBOOK_PICTURE_FAIL,
  SIGN_IN_GOOGLE,
  SIGN_IN_GOOGLE_SUCCESS,
  SIGN_IN_GOOGLE_FAIL,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  VALIDATE_NEW_USER_INFO,
  VALIDATE_NEW_USER_INFO_SUCCESS,
  VALIDATE_NEW_USER_INFO_FAIL,
  RESET_VALIDATE_NEW_USER_INFO_BOOL,
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  VERIFY_CODE_CANCEL,
  RESEND_CODE,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_IDENTITY_ID,
  GET_IDENTITY_ID_SUCCESS,   
  GET_IDENTITY_ID_FAIL,
  UPDATE_AVATAR,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ADD_TO_BOOKMARK,
  ADD_TO_BOOKMARK_SUCCESS,
  ADD_TO_BOOKMARK_FAIL,
  REMOVE_FROM_BOOKMARK,
  REMOVE_FROM_BOOKMARK_SUCCESS,
  REMOVE_FROM_BOOKMARK_FAIL,
  REQUIRE_UPDATE_CLASS_LIST,
  GET_APPLIED_CLASS_LIST,
  GET_APPLIED_CLASS_LIST_SUCCESS,
  GET_APPLIED_CLASS_LIST_FAIL,
  APPLY_CLASS_SUCCESS,
  RENEW_APPLIED_CLASSLIST,
  CREATE_TUTOR,
  CREATE_TUTOR_SUCCESS,
  CREATE_TUTOR_FAIL,
  GET_TUTOR_LIST,
  GET_TUTOR_LIST_SUCCESS,
  GET_TUTOR_LIST_FAIL,
  DELETE_TUTOR,
  DELETE_TUTOR_SUCCESS,
  DELETE_TUTOR_FAIL,
  UPDATE_TUTOR,
  UPDATE_TUTOR_SUCCESS,
  UPDATE_TUTOR_FAIL,
} from '../types';

import AWS from 'aws-sdk';
import awsmobile from '../../aws-exports';
import appSecrets from '../../appSecrets';
import { Observable } from 'rxjs/Observable';

import { ServerErrorCode } from '../../constants/ServerErrorCode'

import Expo from 'expo';
import axios from 'axios';

import { onSignInEmail, onSignUpEmail, onVerifyCode, onResendCode, getIdentityId } from '../../lib/Auth/AWS_Auth';

export const signOut = () => ({
  type: SIGN_OUT_SUCCESS
})

export const signUp = (profile, extraInfo) => ({
  type: SIGN_UP,
  payload: {
    profile,
    extraInfo,
  }
})

export const validateNewUserInfo = (email, username) => ({
  type: VALIDATE_NEW_USER_INFO,
  payload: {
    email,
    username,
  }
}) 

export const verifyCode = (username, password, code) => ({
  type: VERIFY_CODE,
  payload: {
    username,
    password,
    code
  }
})

export const verifyCodeCancel = () => ({
  type: VERIFY_CODE_CANCEL
})

export const resendCode = (username) => ({
  type: RESEND_CODE,
  payload: {
    username,
  }
})

export const signInEmail = (username, password) => ({
  type: SIGN_IN_EMAIL,
  payload: {
    username,
    password,
  }
})

export const updateAvatar = (avatar) => {
  // console.warn('avatar', avatar)
  return {
    type: UPDATE_AVATAR,
    payload: {
      avatar
    }
  }
}

export const updateProfile = (profile) => {
  // console.warn('profile', profile)
  return {
    type: UPDATE_PROFILE,
    payload: {
      profile
    }
  }
}

export const signInFacebook = () => ({
  type: SIGN_IN_FACEBOOK
})

export const signInGoogle = () => ({
  type: SIGN_IN_GOOGLE
})

export const addToBookmark = (classId) => {
  // console.warn('classId', classId)
  return {
    type: ADD_TO_BOOKMARK,
    payload: classId
  }
}

export const removeFromBookmark = (classId) => {
  // console.warn('classId', classId)
  return {
    type: REMOVE_FROM_BOOKMARK,
    payload: classId
  }
}

export function getAppliedClassList(userId) {
  return {
    type: GET_APPLIED_CLASS_LIST,
    payload: userId
  }
}

export const createTutor = (tutorData) => {
  return {
    type: CREATE_TUTOR,
    payload: {
      tutorData,
    }
  }
}

export const getTutorList = (userId = 'testid', lastTutorId) => {
  return {
    type: GET_TUTOR_LIST,
    payload: {
      userId,
      lastStartKey: lastTutorId,
    }
  }
}

export function deleteTutor(cls) {
  return {
    type: DELETE_TUTOR,
    payload: cls
  }
}

export function updateTutor(tutor) {
  return {
    type: UPDATE_TUTOR,
    payload: tutor
  }
}

// this epic will sign in user through AWS Cognito
export const signInEmailEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_IN_EMAIL)
    .mergeMap(action => 
      Observable.fromPromise(onSignInEmail(action.payload.username, action.payload.password))
      .map(res => {
        return {
          type: LOGIN,
          payload: {
            username: action.payload.username,
            awsId: res
          }
        }
      })
      .catch(err => Observable.of({
        type: SIGN_IN_EMAIL_FAIL,
        payload: err
      }))
    )

// this epic will sign up user through AWS Cognito
export const signUpEmailEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_UP)
    .mergeMap(action =>
      Observable.fromPromise(onSignUpEmail(action.payload))
      .map(res => {
        const {password, ...user} = action.payload.profile;
        user.loginType = 'email';
        const { profile, extraInfo } = action.payload;
        return {
          type: REGISTER,
          payload: {
            showMFAPrompt: !res.userConfirmed,
            user,
            extraInfo,
          }
        }
      })
      .catch(err => Observable.of({
        type: SIGN_UP_FAIL,
        payload: err
      }))
    )

export const validateNewUserInfoEpic = (action$, store, { request }) =>
  action$.ofType(VALIDATE_NEW_USER_INFO)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/validateNewUserInfo',
        method: 'post',
        data: {
          ...action.payload,
        } 
      }))
      .map(res => {
        // console.warn('register success', res)
        return {
          type: VALIDATE_NEW_USER_INFO_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: VALIDATE_NEW_USER_INFO_FAIL,
        payload: err
      }))
    )

// this epic will register user at dynamoDb
export const registerEpic = (action$, store, { request }) =>
  action$.ofType(REGISTER)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/register',
        method: 'post',
        data: {
          ...action.payload,
        } 
      }))
      .map(res => {
        // console.warn('register success', res)
        if (action.payload.registerType == 'facebook') {
          return {
            type: LOGIN,
            payload: {
              username: res.data.username,
              awsId: res.data.awsId,
            }
          }
        }
        return {
          type: REGISTER_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: REGISTER_FAIL,
        payload: err
      }))
    )

// this epic will get user profile from dynamoDb
export const loginEpic = (action$, store, { request }) =>
  action$.ofType(LOGIN)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/login',
        method: 'post',
        data: {
          ...action.payload,
        } 
      }))
      .map(res => {
        // console.warn('login success', res)
        return {
          type: LOGIN_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: LOGIN_FAIL,
        payload: err
      }))
    )

// this epic will get user profile from dynamoDb
export const getIdentityIdEpic = (action$, store, { request }) =>
  action$.ofType(GET_IDENTITY_ID)
    .mergeMap(action => 
      Observable.fromPromise(getIdentityId(action.payload.accessToken, action.payload.loginType))
      .map(res => {
        console.warn('getIdentityId success', res)
        let { accessToken, ...user } = action.payload
        return {
          type: REGISTER,
          payload: {
            registerType: 'facebook',
            user: {
              awsId: res,
              ...user
            }
          }
        }
      })
      .catch(err => Observable.of({
        type: LOGIN_FAIL,
        payload: err
      }))
    )

// this epic will verify email address through AWS Cognito
export const verifyCodeEpic = (action$, store, { request }) =>
  action$.ofType(VERIFY_CODE)
    .mergeMap(action => 
      Observable.fromPromise(onVerifyCode(action.payload.username, action.payload.code))
      .map(res => {
        return {
          type: SIGN_IN_EMAIL,
          payload: {
            username: action.payload.username,
            password: action.payload.password,
            isNewUser: true
          }
        }
      })
      .catch(err => Observable.of({
        type: VERIFY_CODE_FAIL,
        payload: err
      }))
    )

export const resendCodeEpic = (action$, store, { request }) =>
  action$.ofType(RESEND_CODE)
    .mergeMap(action => 
      Observable.fromPromise(onResendCode(action.payload.username))
      .map(res => {
        return {
          type: RESEND_CODE_SUCCESS,
        }
      })
      .catch(err => Observable.of({
        type: RESEND_CODE_FAIL,
        payload: err
      }))
    )

export const signInFacebookEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_IN_FACEBOOK)
    .mergeMap(action => 
      Observable.fromPromise(Expo.Facebook.logInWithReadPermissionsAsync(appSecrets.facebook.clientID, {
        permissions: ['public_profile', 'email', 'user_birthday'],
      }))
      .map(res => {
        switch (res.type) {
          case 'success':
            return {
              type: GET_FACEBOOK_PROFILE,
              payload: {
                accessToken: res.token
              }
            }
          case 'cancel':
            return {
              type: SIGN_IN_FACEBOOK_FAIL,
              payload: { type: ServerErrorCode.FACEBOOK_LOGIN_CANCEL }
            }
          default:
            return {
              type: SIGN_IN_FACEBOOK_FAIL,
              payload: { type: ServerErrorCode.FACEBOOK_LOGIN_FAIL }//'login failed'
            }
        }
      })
      .catch(error => Observable.of({
        type: SIGN_IN_FACEBOOK_FAIL,
        payload: { type: ServerErrorCode.FACEBOOK_LOGIN_FAIL }
      })),
    )

export const getFacebookProfileEpic = (action$, store, { request }) =>
  action$.ofType(GET_FACEBOOK_PROFILE)
    .mergeMap(action => 
      Observable.fromPromise(axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${action.payload.accessToken}`
      ))
      .map(res => {
        // console.warn('GET_FACEBOOK_PROFILE_SUCCESS', res.data)
        return {
          type: GET_FACEBOOK_PICTURE,
          payload: {
            facebookId: res.data.id,
            email: res.data.email,
            username: res.data.name,
            accessToken: action.payload.accessToken
          }
        }
      })
      .catch(error => Observable.of({
        type: GET_FACEBOOK_PROFILE_FAIL,
        payload: ServerErrorCode.FACEBOOK_GET_PROFILE_FAIL // 'get profile failed'
      })),
    )

/* here is an example of the reponse
  {
    "data": {
        "height": 200,
        "is_silhouette": false,
        "url": "https://scontent.xx.fbcdn.net/v/t1.0-1/23722601_121579211952166_3148123853748525094_n.jpg?oh=c5a41b2f36f58428a38395718d3bb772&oe=5AACA778",
        "width": 200
    }
  }
*/
export const getFacebookPictureEpic = (action$, store, { request }) =>
  action$.ofType(GET_FACEBOOK_PICTURE)
    .mergeMap(action => 
      Observable.fromPromise(axios.get(
        `https://graph.facebook.com/${action.payload.facebookId}/picture?redirect=false&type=large&access_token=${action.payload.accessToken}`
      ))
      .map(res => {
        // console.warn('GET_FACEBOOK_PICTURE_SUCCESS', res.data.data)
        return {
          type: GET_IDENTITY_ID,
          payload: {
            avatarUrl: res.data.data.url,
            loginType: 'facebook',
            ...action.payload  
          }
        }
      })
      .catch(error => Observable.of({
        type: GET_FACEBOOK_PICTURE_FAIL,
        payload: ServerErrorCode.FACEBOOK_GET_PICTURE_FAIL // 'get profile failed'
      })),
    )

export const signInGoogleEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_IN_GOOGLE)
    .mergeMap(action => 
      Observable.fromPromise(Expo.Google.logInAsync({
        androidClientId: appSecrets.google.oauth.android,
        iosClientId: appSecrets.google.oauth.ios,
        scopes: ['profile', 'email']
      }))
      .map(res => {
        switch (res.type) {
          case 'success':
            // console.warn('success', res)
            return {
              type: GET_IDENTITY_ID,
              payload: {
                loginType: 'google',
                accessToken: res.idToken,
                avatarUrl: res.user.photoUrl,
                email: res.user.email,
                username: res.user.name,
              }
            }
          case 'cancel':
            return {
              type: SIGN_IN_GOOGLE_FAIL,
              payload: { type: ServerErrorCode.GOOGLE_LOGIN_CANCEL }
            }
          default:
            return {
              type: SIGN_IN_GOOGLE_FAIL,
              payload: { type: ServerErrorCode.GOOGLE_LOGIN_FAIL }
            }
        }
      })
      .catch(error => Observable.of({
        type: SIGN_IN_GOOGLE_FAIL,
        payload: { type: ServerErrorCode.GOOGLE_LOGIN_FAIL }
      })),
    )

export const updateAvatarEpic = (action$, store, { request }) =>
  action$.ofType(UPDATE_AVATAR)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/updateAvatar',
        data: {
          key: 'test',
          file: action.payload.avatar.base64,
          awsId: store.getState().userProfile.user.awsId//this.props.user.awsId
        }
       }))
      .map(res => {
        console.warn('update avatar success', res.data)
        return {
          type: UPDATE_AVATAR_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: UPDATE_AVATAR_FAIL,
        payload: err
      }))
    )

export const updateProfileEpic = (action$, store, { request }) =>
  action$.ofType(UPDATE_PROFILE)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/updateProfile',
        data: {
          key: 'test',
          awsId: store.getState().userProfile.user.awsId,//this.props.user.awsId
          user: action.payload.profile
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: UPDATE_PROFILE_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: UPDATE_PROFILE_FAIL,
        payload: err
      }))
    )

export const addToBookmarkEpic = (action$, store, { request }) =>
  action$.ofType(ADD_TO_BOOKMARK)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/addToBookmark/${action.payload}`,
        method: 'post',
        data: {
          userId: store.getState().userProfile.user.userId
        } 
      }))
      .map(res => {
        // console.warn('ADD_TO_BOOKMARK success', res.data.classList)
        return {
          type: ADD_TO_BOOKMARK_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: ADD_TO_BOOKMARK_FAIL,
        payload: err
      }))
    )

export const removeFromBookmarkEpic = (action$, store, { request }) =>
  action$.ofType(REMOVE_FROM_BOOKMARK)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/removeFromBookmark/${action.payload}`,
        method: 'post',
        data: {
          userId: store.getState().userProfile.user.userId //"b26f7ab4-ef3e-4d27-8cef-0cf984243e07"
        } 
      }))
      .map(res => {
        // console.warn('REMOVE_FROM_BOOKMARK success', res.data.classList)
        return {
          type: REMOVE_FROM_BOOKMARK_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: REMOVE_FROM_BOOKMARK_FAIL,
        payload: err
      }))
    )

export const requireUpdateClassListEpic = (action$, store, { request }) =>
  action$.ofType(ADD_TO_BOOKMARK_SUCCESS, REMOVE_FROM_BOOKMARK_SUCCESS)
    .mapTo({
      type: REQUIRE_UPDATE_CLASS_LIST
    })

export const getAppliedClassListEpic = (action$, store, { request }) =>
  action$.ofType(LOGIN_SUCCESS, APPLY_CLASS_SUCCESS, RENEW_APPLIED_CLASSLIST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getAppliedClassList',
        method: 'post',
        data: {
          userId: store.getState().userProfile.user.userId
        } 
      }))
      .map(res => {
        //console.warn('GET_ALL_CLASS_LIST success', res.data.classList)
        return {
          type: GET_APPLIED_CLASS_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_APPLIED_CLASS_LIST_FAIL,
        payload: err
      }))
    )

export const createTutorEpic = (action$, store, { request }) =>
  action$.ofType(CREATE_TUTOR)
    .mergeMap(action => 
      Observable.fromPromise(request({
        method: 'post',
        url: '/createTutor',
        data: {
          tutorData: action.payload.tutorData,
          userId: store.getState().userProfile.user.userId,
        }
       }))
      .map(res => {
        // console.warn('update profile success', res.data)
        return {
          type: CREATE_TUTOR_SUCCESS,
          // payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: CREATE_TUTOR_FAIL,
        payload: err
      }))
    )

export const getTutorListEpic = (action$, store, { request }) =>
  action$.ofType(GET_TUTOR_LIST, CREATE_TUTOR_SUCCESS,  DELETE_TUTOR_SUCCESS, UPDATE_TUTOR_SUCCESS) //, DUPLICATE_TUTOR_SUCCESS)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getTutorList',
        method: 'post',
        data: {
          ...action.payload,
          userId: (action.payload && action.payload.userId) || store.getState().userProfile.user.userId
        } 
      }))
      .map(res => {
        return {
          type: GET_TUTOR_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_TUTOR_LIST_FAIL,
        payload: err
      }))
    )

export const deleteTutorEpic = (action$, store, { request }) =>
  action$.ofType(DELETE_TUTOR)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/deleteTutor/${action.payload.userId}`,
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        return {
          type: DELETE_TUTOR_SUCCESS,
          // payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: DELETE_TUTOR_FAIL,
        payload: err
      }))
    )

export const updateTutorEpic = (action$, store, { request }) =>
  action$.ofType(UPDATE_TUTOR)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: `/updateTutor/${action.payload.userId}`,
        method: 'post',
        data: {
          ...action.payload
        } 
      }))
      .map(res => {
        return {
          type: UPDATE_TUTOR_SUCCESS,
          // payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: UPDATE_TUTOR_FAIL,
        payload: err
      }))
    )
