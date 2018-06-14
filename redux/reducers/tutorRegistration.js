import {
  SET_TUTORPROFILE,
  SET_SELFINTRO,
  SET_PROFESSION,
  SET_EXPERIENCE,
  SET_ACHIEVEMENT,
  CLEAR_TUTORPROFILE,
} from '../types'

const defaultState = {
  profile: {},
  selfIntro:'',
  profession:'',
  experience: 0,
  achievement: '',
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
        profile: {},
        selfIntro:'',
        profession:'',
        experience: 0,
        achievement: '',
      }
    default:
      return state
  }
}
