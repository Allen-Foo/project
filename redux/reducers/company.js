import {
  SET_COMPANY_PROFILE,
  SET_COMPANY_DISPALY_NAME,
  SET_COMPANY_INTRODUCTION,
  SET_COMPANY_LOGO,
  SET_COMPANY_SLOGAN,
  SET_COMPANY_BANNER,
  GET_COMPANY_DETAIL,
  GET_COMPANY_DETAIL_SUCCESS,
  GET_COMPANY_DETAIL_FAIL,
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
    case GET_COMPANY_DETAIL:
      return {
        ...state,
        isLoading: true,
        profile: null,
        displayName:'',
        introduction:'',
        logo:'',
        slogan: '',
        banner: [],
      }
    case GET_COMPANY_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload.profile,
        displayName: action.payload.displayName,
        introduction: action.payload.introduction,
        logo: action.payload.logo,
        slogan: action.payload.slogan,
        banner: action.payload.banner,
      }
    case GET_COMPANY_DETAIL_FAIL:
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
