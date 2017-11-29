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
} from '../types';


const defaultState = {
  isLoggedIn: false,
  accessToken: null,
  avatarUrl: null,
  email: null,
  userName: null
}

// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case SIGN_IN_EMAIL:
      // console.warn('here', 'SIGN_IN_EMAIL')
      return state
    case SIGN_IN_EMAIL_SUCCESS:
      // console.warn('here', 'SIGN_IN_EMAIL_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload
      };
    case SIGN_IN_EMAIL_FAIL:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    case SIGN_IN_FACEBOOK:
      // console.warn('here', 'SIGN_IN_FACEBOOK')
      return state
    case SIGN_IN_FACEBOOK_SUCCESS:
      // console.warn('here', 'SIGN_IN_FACEBOOK_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload
      };
    case SIGN_IN_FACEBOOK_FAIL:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    case GET_FACEBOOK_PROFILE:
      // console.warn('here', 'GET_FACEBOOK_PROFILE')
      return state
    case GET_FACEBOOK_PROFILE_SUCCESS:
      // console.warn('here', 'GET_FACEBOOK_PROFILE_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload
      };
    case GET_FACEBOOK_PROFILE_FAIL:
      // console.warn('here', 'GET_FACEBOOK_PROFILE_FAIL', action.payload)
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    case GET_FACEBOOK_PICTURE:
      // console.warn('here', 'GET_FACEBOOK_PICTURE')
      return state
    case GET_FACEBOOK_PICTURE_SUCCESS:
      // console.warn('here', 'GET_FACEBOOK_PICTURE_SUCCESS', action.payload)
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload
      };
    case GET_FACEBOOK_PICTURE_FAIL:
      // console.warn('here', 'GET_FACEBOOK_PICTURE_FAIL', action.payload)
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    case SIGN_IN_GOOGLE:
      // console.warn('here', 'SIGN_IN_GOOGLE')
      return state
    case SIGN_IN_GOOGLE_SUCCESS:
      // console.warn('here', 'SIGN_IN_GOOGLE_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload
      };
    case SIGN_IN_GOOGLE_FAIL:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    default:
      return state
  }
}