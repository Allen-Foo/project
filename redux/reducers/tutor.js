import {
  SET_TUTORPROFILE,
  SET_SELFINTRO,
  SET_PROFESSION,
  SET_EXPERIENCE,
  SET_ACHIEVEMENT,
  CLEAR_TUTORPROFILE,
  GET_TUTOR_DETAIL,
  GET_TUTOR_DETAIL_SUCCESS,
  GET_TUTOR_DETAIL_FAIL,
  GET_REVENUE,
  GET_REVENUE_SUCCESS,
  GET_REVENUE_FAIL,
  WITHDRAW_MONEY,
  WITHDRAW_MONEY_SUCCESS,
  WITHDRAW_MONEY_FAIL,
  GET_WITHDRAW_RECORD,
  GET_WITHDRAW_RECORD_SUCCESS,
  GET_WITHDRAW_RECORD_FAIL,
} from '../types'

const defaultState = {
  isLoading: false,
  profile: null,
  selfIntro:'',
  profession:'',
  experience: 0,
  achievement: '',
  revenue: 0,
  withdrawnList: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TUTORPROFILE:
      return {
        ...state,
        profile: action.payload,
      }
    case SET_SELFINTRO:
      return {
        ...state,
        selfIntro: action.payload,
      }
    case SET_PROFESSION:
      return {
        ...state,
        profession: action.payload,
      }
    case SET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
      }
    case SET_ACHIEVEMENT:
      return {
        ...state,
        achievement: action.payload,
      }
    case CLEAR_TUTORPROFILE:
      return {
        ...state,
        profile: null,
        selfIntro:'',
        profession:'',
        experience: 0,
        achievement: '',
      }
    case GET_TUTOR_DETAIL :
      return {
        ...state,
        isLoading: true,
        profile: null,
        selfIntro:'',
        profession:'',
        experience: 0,
        achievement: '',
      }
    case GET_TUTOR_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload.profile,
        selfIntro: action.payload.selfIntro,
        profession: action.payload.profession,
        experience: action.payload.experience,
        achievement: action.payload.achievement,
      }
    case GET_TUTOR_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_REVENUE:
      return {
        ...state,
        isLoading: true,
        revenue: 0,
      }
    case GET_REVENUE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        revenue: action.payload.revenue,
      }
    case GET_REVENUE_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case WITHDRAW_MONEY:
      return {
        ...state,
        isLoading: true,
      }
    case WITHDRAW_MONEY_SUCCESS:
      return {
        isLoading: false,
      }
    case WITHDRAW_MONEY_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_WITHDRAW_RECORD:
      if (!action.payload.lastRecordId) {
        return {
          ...state,
          isLoading: true,
          withdrawnList: [],
        }
      }
      else {
        return {
          ...state,
          isLoading: true,
        }
      }
    case GET_WITHDRAW_RECORD_SUCCESS:
      let withdrawnList
      if (state.withdrawnList && state.withdrawnList.length > 0) {
        withdrawnList = state.withdrawnList.concat(action.payload.withdrawnList)
      } else {
        withdrawnList = action.payload.withdrawnList
      }
      return {
        ...state,
        isLoading: false,
        withdrawnList: withdrawnList,

      }
    case GET_WITHDRAW_RECORD_FAIL:
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
