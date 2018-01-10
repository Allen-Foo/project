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
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  VERIFY_CODE_CANCEL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_IDENTITY_ID,
  GET_IDENTITY_ID_SUCCESS,
  GET_IDENTITY_ID_FAIL,
} from '../types';

import AWS from 'aws-sdk';
import awsmobile from '../../aws-exports';

import appSecrets from '../../appSecrets';
import { Observable } from 'rxjs/Observable';
import Expo from 'expo';
import axios from 'axios';

import { onSignInEmail, onSignUpEmail, onVerifyCode, getIdentityId } from '../../lib/Auth/AWS_Auth';

export const signOut = () => ({
  type: SIGN_OUT_SUCCESS
})

export const signUp = (profile) => ({
  type: SIGN_UP,
  payload: {
    profile
  }
})

export const verifyCode = (username, code) => ({
  type: VERIFY_CODE,
  payload: {
    username,
    code
  }
})

export const verifyCodeCancel = () => ({
  type: VERIFY_CODE_CANCEL
})

export const signInEmail = (username, password) => ({
  type: SIGN_IN_EMAIL,
  payload: {
    username,
    password,
  }
})

export const signInFacebook = () => ({
  type: SIGN_IN_FACEBOOK
})

export const signInGoogle = () => ({
  type: SIGN_IN_GOOGLE
})

// this epic will sign in user through AWS Cognito
export const signInEmailEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_IN_EMAIL)
    .mergeMap(action => 
      Observable.fromPromise(onSignInEmail(action.payload.username, action.payload.password))
      .map(res => {
        if (action.payload.isNewUser) {
          // remove password field and add login type and awsId
          const {password, ...user} = store.getState().socialLogin.user
          user.loginType = 'email';
          user.awsId = res;
          return {
            type: REGISTER,
            payload: {
              user
            }
          }  
        } else {
          return {
            type: "LOGIN",
            payload: {
              awsId: res
            }
          }
        }
      })
      .catch(err => Observable.of({
        type: SIGN_IN_EMAIL_FAIL,
        payload: err.message
      }))
    )

// this epic will sign up user through AWS Cognito
export const signUpEmailEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_UP)
    .mergeMap(action => 
      Observable.fromPromise(onSignUpEmail(action.payload.profile))
      .map(res => {
        // console.warn('signUpEmailEpic', res)
        return {
          type: SIGN_UP_SUCCESS,
          payload: {
            showMFAPrompt: !res.userConfirmed,
            user: action.payload.profile
          }
        }
      })
      .catch(err => Observable.of({
        type: SIGN_UP_FAIL,
        payload: err.message
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
          ...action.payload.user,
        } 
      }))
      .map(res => {
        // console.warn('register success', res)
        return {
          type: REGISTER_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: REGISTER_FAIL,
        payload: err.message
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
        payload: err.message
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
            user: {
              awsId: res,
              ...user
            }
          }
        }
      })
      .catch(err => Observable.of({
        type: LOGIN_FAIL,
        payload: err.message
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
            username: store.getState().socialLogin.user.username,
            password: store.getState().socialLogin.user.password,
            isNewUser: true
          }
        }
      })
      .catch(err => Observable.of({
        type: VERIFY_CODE_FAIL,
        payload: err.message
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
              payload: 'login canceled'
            }
          default:
            return {
              type: SIGN_IN_FACEBOOK_FAIL,
              payload: 'login failed'
            }
        }
      })
      .catch(error => Observable.of({
        type: SIGN_IN_FACEBOOK_FAIL,
        payload: 'login failed'
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
        payload: 'get profile failed'
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
        payload: 'get profile failed'
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
              type: SIGN_IN_GOOGLE_SUCCESS,
              payload: {
                accessToken: res.accessToken,
                avatarUrl: res.user.photoUrl,
                email: res.user.email,
                username: res.user.name,
              }
            }
          case 'cancel':
            return {
              type: SIGN_IN_GOOGLE_FAIL,
              payload: 'login canceled'
            }
          default:
            return {
              type: SIGN_IN_GOOGLE_FAIL,
              payload: 'login failed'
            }
        }
      })
      .catch(error => Observable.of({
        type: SIGN_IN_GOOGLE_FAIL,
        payload: 'login failed'
      })),
    )
