import {
  SET_COMPANY_PROFILE,
  SET_COMPANY_DISPALY_NAME,
  SET_COMPANY_INTRODUCTION,
  SET_COMPANY_LOGO,
  SET_COMPANY_SLOGAN,
  SET_COMPANY_BANNER,
} from '../types'

const defaultState = {
  isLoading: false,
  profile: null,
  displayName:'',
  introduction:'',
  logo:'',
  slogan: '',
  banner: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_COMPANY_PROFILE:
      return {
        ...state,
        profile: action.payload,
      }
    case SET_COMPANY_DISPALY_NAME:
      return {
        ...state,
        displayName: action.payload,
      }
    case SET_COMPANY_INTRODUCTION:
      return {
        ...state,
        introduction: action.payload,
      }
    case SET_COMPANY_LOGO:
      return {
        ...state,
        logo: action.payload,
      }
    case SET_COMPANY_SLOGAN:
      return {
        ...state,
        slogan: action.payload,
      }
    case SET_COMPANY_BANNER:
      return {
        ...state,
        banner: action.payload,
      }
    default:
      return state
  }
}
