import {
  SET_OFFERCLASS,
} from '../types'

const defaultState = {
  offerCourse:'',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_OFFERCLASS:
      return {
        ...state,
        offerCourse: action.payload,
      }
    default:
      return state
  }
}
