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
  GET_APPLIED_CLASS_LIST,
  GET_APPLIED_CLASS_LIST_SUCCESS,
  GET_APPLIED_CLASS_LIST_FAIL,
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


const defaultState = {
  isLoading: false,
  isLoggedIn: false,
  hasValidateNewUserInfo: false,
  // awsId: null,                                                        
  // avatarUrl: null,
  // user: null,
  isVerified: false,
  verfiedErrorMsg: null,
  fetchErrorMsg: null,
  bookmark: [],
  tutorInformation: null,
}

// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case SIGN_UP:
      // console.warn('here', 'SIGN_UP')
      return {
        ...state,
        showMFAPrompt: false,
        isLoading: true,
        tutorInformation:{
          selfIntro : action.payload.selfIntro,
          profession : action.payload.profession,
          experience : action.payload.experience,
          achievement : action.payload.achievement
        }       
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
    case VALIDATE_NEW_USER_INFO:
      return {
        ...state,
        isLoading: true,
        hasValidateNewUserInfo: false,
      }
    case VALIDATE_NEW_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasValidateNewUserInfo: true,
      }
    case VALIDATE_NEW_USER_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
        hasValidateNewUserInfo: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case REGISTER:
      // console.warn('here', 'REGISTER')
      return {
        ...state,
        isLoading: true,
      }
    case REGISTER_SUCCESS:
      // console.warn('here', 'REGISTER_SUCCESS')
      return {
        ...state,
        isLoading: false,
        // isLoggedIn: true,
        // user: action.payload,
        bookmark: action.payload.bookmark || [],
        showMFAPrompt: true,
      };
    case REGISTER_FAIL:
      // console.warn('here', 'REGISTER_FAIL')
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case LOGIN:
      // console.warn('here', 'LOGIN')
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_SUCCESS:
      // console.warn('here', 'LOGIN_SUCCESS')
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        showMFAPrompt: false,
        isVerified: true,
        // user: action.payload,
        bookmark: action.payload.bookmark || [],
      };
    case LOGIN_FAIL:
      // console.warn('here', 'LOGIN_FAIL')
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case VERIFY_CODE:
      // console.warn('here', 'VERIFY_CODE')
      return {
        ...state,
        isLoading: true,
        isVerified: false,
        showMFAPrompt: false,
      }
    // case VERIFY_CODE_SUCCESS:
    //   // console.warn('here', 'VERIFY_CODE_SUCCESS')
    //   return {
    //     ...state,
    //     isLoading: false,
    //     showMFAPrompt: false,
    //     isVerified: true,
    //   };
    case VERIFY_CODE_FAIL:
      // console.warn('VERIFY_CODE_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
        showMFAPrompt: true,
        isVerified: false,
        verfiedErrorMsg: action.payload.message,
      }
    case VERIFY_CODE_CANCEL:
      return {
        ...state,
        showMFAPrompt: false,
        verfiedErrorMsg: null,
      }
    case RESEND_CODE:
      // console.warn('here', 'RESEND_CODE')
      return {
        ...state,
        isLoading: true,
      }
    case RESEND_CODE_SUCCESS:
      // console.warn('here', 'RESEND_CODE_SUCCESS')
      return {
        ...state,
        isLoading: false,
      };
    case RESEND_CODE_FAIL:
      // console.warn('RESEND_CODE_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
      }
    case SIGN_IN_EMAIL:
      // console.warn('here', 'SIGN_IN_EMAIL')
      return {
        ...state,
        isLoading: true,
        showMFAPrompt: false,
      }
    case SIGN_IN_EMAIL_SUCCESS:
      // console.warn('here', 'SIGN_IN_EMAIL_SUCCESS')
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        awsId: action.payload.awsId
      };
    case SIGN_IN_EMAIL_FAIL:
      // console.warn('here', 'SIGN_IN_EMAIL_FAIL', action.payload)
      // show Prompt only when the error type is 'UserNotConfirmed'
      let showMFAPrompt = false
      if (action.payload && action.payload.code === 'UserNotConfirmedException') {
        showMFAPrompt = true
      }
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
        showMFAPrompt: showMFAPrompt,
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
        // awsId: action.payload
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
    case UPDATE_AVATAR:
      // console.warn('here', 'UPDATE_AVATAR')
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_AVATAR_SUCCESS:
      // console.warn('here', 'UPDATE_AVATAR_SUCCESS')
      return {
        ...state,
        isLoading: false,
        // user: action.payload
      };
    case UPDATE_AVATAR_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case UPDATE_PROFILE:
      // console.warn('here', 'UPDATE_PROFILE')
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_PROFILE_SUCCESS:
      // console.warn('here', 'UPDATE_PROFILE_SUCCESS')
      return {
        ...state,
        isLoading: false,
        // user: action.payload
      };
    case UPDATE_PROFILE_FAIL:
      // console.warn('here', 'UPDATE_PROFILE_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case ADD_TO_BOOKMARK:
      // console.warn('here', 'ADD_TO_BOOKMARK')
      return {
        ...state,
        isLoading: true,
      }
    case ADD_TO_BOOKMARK_SUCCESS:
      // console.warn('here', 'ADD_TO_BOOKMARK_SUCCESS')
      return {
        ...state,
        isLoading: false,
        // user: action.payload,
        bookmark: action.payload.bookmark || [],
      };
    case ADD_TO_BOOKMARK_FAIL:
      // console.warn('here', 'ADD_TO_BOOKMARK_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
     case REMOVE_FROM_BOOKMARK:
      // console.warn('here', 'REMOVE_FROM_BOOKMARK')
      return {
        ...state,
        isLoading: true,
      }
    case REMOVE_FROM_BOOKMARK_SUCCESS:
      // console.warn('here', 'REMOVE_FROM_BOOKMARK_SUCCESS')
      return {
        ...state,
        isLoading: false,
        // user: action.payload,
        bookmark: action.payload.bookmark || [],
      };
    case REMOVE_FROM_BOOKMARK_FAIL:
      // console.warn('here', 'REMOVE_FROM_BOOKMARK_FAIL', action.payload)
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_APPLIED_CLASS_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_APPLIED_CLASS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // appliedClassList: action.payload.appliedClassList,
      };
    case GET_APPLIED_CLASS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }

    case CREATE_TUTOR:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_TUTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutorList:[]
      };
    case CREATE_TUTOR_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_TUTOR_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TUTOR_LIST_SUCCESS:
      let tutorList
      if (state.tutorList && state.tutorList.length > 0) {
        tutorList = state.tutorList.concat(action.payload.tutorList)
      } else {
        tutorList = action.payload.tutorList
      }
      
      return {
        ...state,
        isLastTutorList: action.payload.isLastTutor,
        isLoading: false,
        tutorList: tutorList,
      };
    case GET_TUTOR_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case UPDATE_TUTOR:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_TUTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutorList: [],
      };
    case UPDATE_TUTOR_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case DELETE_TUTOR:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_TUTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutorList: [],
      };
    case DELETE_TUTOR_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    default:
      return state
  }
}