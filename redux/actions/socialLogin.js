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
} from '../types';

import AWS from 'aws-sdk';
import awsmobile from '../../aws-exports';


import appSecrets from '../../appSecrets';
import { Observable } from 'rxjs/Observable';
import Expo from 'expo';
import axios from 'axios';

export const signOut = () => ({
  type: SIGN_OUT_SUCCESS
})

export const signUp = () => ({
  type: SIGN_UP,
})

export const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    
  }
})

export const signUpFail = (err) => ({
  type: SIGN_UP_FAIL,
  payload: err.message
})

export const signInEmail = (email, password) => ({
  type: SIGN_IN_EMAIL,
  payload: {
    email,
    password,
  }
})

export const signInEmailSuccess = (identityId) => ({
  type: SIGN_IN_EMAIL_SUCCESS,
  payload: {
    loginType: 'email',
    identityId: identityId
  }
})

export const signInEmailFail = (err) => ({
  type: SIGN_IN_EMAIL_FAIL,
  payload: err.message
})

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
            // 
            // Add the Facebook access token to the Cognito credentials login map.
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
              Logins: {
                'graph.facebook.com': res.token
              }
            });

            // Obtain AWS credentials
            // // We can set the get method of the Credentials object to retrieve
            // the unique identifier for the end user (identityId) once the provider
            // has refreshed itself
            AWS.config.credentials.get(function(err) {
                if (err) {
                    console.warn("Error: "+err);
                    return;
                }
                console.warn("Cognito Identity Id: " + AWS.config.credentials.identityId);
             
                // Other service clients will automatically use the Cognito Credentials provider
                // configured in the JavaScript SDK.
                // var cognitoSyncClient = new AWS.CognitoSync();
                // cognitoSyncClient.listDatasets({
                //     IdentityId: AWS.config.credentials.identityId,
                //     IdentityPoolId: "YOUR_COGNITO_IDENTITY_POOL_ID"
                // }, function(err, data) {
                //     if ( !err ) {
                //         console.log(JSON.stringify(data));
                //     }
                // });
            });
            

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

export const getFacebookProfileEpic = (action$, store, { request }) =>
  action$.ofType(GET_FACEBOOK_PROFILE)
    .mergeMap(action => 
      Observable.fromPromise(axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${action.payload}`
      ))
      .map(res => {
        // console.warn('GET_FACEBOOK_PROFILE_SUCCESS', res.data)

        store.dispatch({
          type: GET_FACEBOOK_PICTURE,
          payload: {
            userId: res.data.id,
            accessToken: action.payload,
          }
        })

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
        `https://graph.facebook.com/${action.payload.userId}/picture?redirect=false&type=large&access_token=${action.payload.accessToken}`
      ))
      .map(res => {
        // console.warn('GET_FACEBOOK_PICTURE_SUCCESS', res.data.data)

        return {
          type: GET_FACEBOOK_PICTURE_SUCCESS,
          payload: {
            avatarUrl: res.data.data.url,
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
