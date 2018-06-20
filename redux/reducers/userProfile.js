import {
  SIGN_IN_EMAIL_SUCCESS,
  SIGN_IN_FACEBOOK_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  ADD_TO_BOOKMARK_SUCCESS,
  REMOVE_FROM_BOOKMARK_SUCCESS,
  SIGN_OUT_SUCCESS,
  GET_APPLIED_CLASS_LIST_SUCCESS,
} from '../types'

const defaultState = {
  awsId: null,                                                        
  user: null,
  appliedClassList: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN_EMAIL_SUCCESS:
      // console.warn('here', 'SIGN_IN_EMAIL_SUCCESS')
      return {
        ...state,
        awsId: action.payload.awsId
      };
    case SIGN_IN_FACEBOOK_SUCCESS:
      // console.warn('here', 'SIGN_IN_FACEBOOK_SUCCESS')
      return {
        ...state,
        awsId: action.payload
      };
    case REGISTER_SUCCESS:
      // console.warn('here', 'REGISTER_SUCCESS')
      return {
        ...state,
        // user: action.payload,
      };
    case LOGIN_SUCCESS:
      // console.warn('here', 'LOGIN_SUCCESS')
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_AVATAR_SUCCESS:
      // console.warn('here', 'UPDATE_AVATAR_SUCCESS')
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_PROFILE_SUCCESS:
      // console.warn('here', 'UPDATE_PROFILE_SUCCESS')
      return {
        ...state,
        user: action.payload
      };
    case ADD_TO_BOOKMARK_SUCCESS:
      // console.warn('here', 'ADD_TO_BOOKMARK_SUCCESS')
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_FROM_BOOKMARK_SUCCESS:
      // console.warn('here', 'REMOVE_FROM_BOOKMARK_SUCCESS')
      return {
        ...state,
        user: action.payload,
      };
    case GET_APPLIED_CLASS_LIST_SUCCESS:
      return {
        ...state,
        appliedClassList: action.payload.appliedClassList,
      };
    case SIGN_OUT_SUCCESS:
      // console.warn('here', 'SIGN_OUT_SUCCESS')
      return {
        ...defaultState
      };
    default:
      return state
  }
}
