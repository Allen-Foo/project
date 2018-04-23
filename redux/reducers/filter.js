import {
  SET_KEYWORD,
  SET_ADDRESS,
} from '../types'

const defaultState = {
  keyword: '',
  address: '',
  filter: null,
  sort: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      }
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }
    default:
      return state
  }
}
