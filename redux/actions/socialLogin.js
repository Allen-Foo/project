// socialLogin.js
import {
  SIGN_IN_FACEBOOK,
  SIGN_IN_FACEBOOK_SUCCESS,
  SIGN_IN_FACEBOOK_FAIL,
  GET_FACEBOOK_PROFILE,
  GET_FACEBOOK_PROFILE_SUCCESS,
  GET_FACEBOOK_PROFILE_FAIL,
  SIGN_IN_GOOGLE,
  SIGN_IN_GOOGLE_SUCCESS,
  SIGN_IN_GOOGLE_FAIL,
} from '../types';

import appSecrets from '../../appSecrets';
import { Observable } from 'rxjs/Observable';
import Expo from 'expo';
import axios from 'axios';


export const signInFacebook = () => ({
  type: SIGN_IN_FACEBOOK
})

export const signInGoogle = () => ({
  type: SIGN_IN_GOOGLE
})

export const signInFacebookEpic = (action$, store, { request }) =>
  action$.ofType(SIGN_IN_FACEBOOK)
    .mergeMap(action => 
      Observable.fromPromise(Expo.Facebook.logInWithReadPermissionsAsync(appSecrets.facebook.clientID, {
        permissions: ['public_profile', 'email', 'user_birthday'],
      }))
      .map(res => {
        switch (res.type) {
          case 'success':
            // console.warn('success', res)

            store.dispatch({
              type: GET_FACEBOOK_PROFILE,
              payload: res.token,
            })

            return {
              type: SIGN_IN_FACEBOOK_SUCCESS,
              payload: res.token
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

//`https://graph.facebook.com/${action.payload.facebookUserID}/picture?redirect=false&type=large&access_token=${action.payload.accessToken}`))
export const getFacebookProfileEpic = (action$, store, { request }) =>
  action$.ofType(GET_FACEBOOK_PROFILE)
    .mergeMap(action => 
      Observable.fromPromise(axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${action.payload}`
      ))
      .map(res => {
        // console.warn('success', res.data)

        return {
          type: GET_FACEBOOK_PROFILE_SUCCESS,
          payload: {
            id: res.data.id,
            email: res.data.email,
            userName: res.data.name,
          }
        }
      })
      .catch(error => Observable.of({
        type: GET_FACEBOOK_PROFILE_FAIL,
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
            console.warn('success', res)
            return {
              type: SIGN_IN_GOOGLE_SUCCESS,
              payload: {
                accessToken: res.accessToken,
                avatarUrl: res.user.photoUrl,
                email: res.user.email,
                userName: res.user.name,
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
