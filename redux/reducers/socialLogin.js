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
} from '../types';


const defaultState = {
  isLoading: false,
  isLoggedIn: false,
  accessToken: null,                                                        
  avatarUrl: null,
  email: null,
  userName: null,
  isVerified: false,
  verfiedErrorMsg: null,
  fetchErrorMsg: null,
}

// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case SIGN_UP:
      // console.warn('here', 'SIGN_UP')
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_UP_SUCCESS:
      // console.warn('here', 'SIGN_UP_SUCCESS')
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case VERIFY_CODE:
      console.warn('here', 'VERIFY_CODE')
      return {
        ...state,
        isLoading: true,
        isVerified: false,
        showMFAPrompt: false,
      }
    case VERIFY_CODE_SUCCESS:
      console.warn('here', 'VERIFY_CODE_SUCCESS')
      return {
        ...state,
        isLoading: false,
        showMFAPrompt: false,
        isVerified: true,
      };
    case VERIFY_CODE_FAIL:
      console.warn('VERIFY_CODE_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
        showMFAPrompt: true,
        isVerified: false,
        verfiedErrorMsg: action.payload,
      }
    case VERIFY_CODE_CANCEL:
      return {
        ...state,
        showMFAPrompt: false,
      }
    case SIGN_IN_EMAIL:
      // console.warn('here', 'SIGN_IN_EMAIL')
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_IN_EMAIL_SUCCESS:
      // console.warn('here', 'SIGN_IN_EMAIL_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        accessToken: action.payload
      };
    case SIGN_IN_EMAIL_FAIL:
      // console.warn('here', 'SIGN_IN_EMAIL_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case SIGN_IN_FACEBOOK:
      // console.warn('here', 'SIGN_IN_FACEBOOK')
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_IN_FACEBOOK_SUCCESS:
      // console.warn('here', 'SIGN_IN_FACEBOOK_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        accessToken: action.payload
      };
    case SIGN_IN_FACEBOOK_FAIL:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
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
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
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
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case SIGN_IN_GOOGLE:
      // console.warn('here', 'SIGN_IN_GOOGLE')
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_IN_GOOGLE_SUCCESS:
      // console.warn('here', 'SIGN_IN_GOOGLE_SUCCESS')
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        ...action.payload
      };
    case SIGN_IN_GOOGLE_FAIL:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case SIGN_OUT:
      // console.warn('here', 'SIGN_OUT')
      return state
    case SIGN_OUT_SUCCESS:
      // console.warn('here', 'SIGN_OUT_SUCCESS')
      return {
        ...defaultState
      };
    case SIGN_OUT_FAIL:
      // console.warn('here', 'DO_GET_SUCCESS', action.payload)
      return {
        ...state,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    default:
      return state
  }
}