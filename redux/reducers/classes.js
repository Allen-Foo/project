import {
  CREATE_CLASS,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
} from '../types';


const defaultState = {
  classList: [],
  classDetail: null
}


// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      // console.warn('here', 'CREATE_CLASS')
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_CLASS_SUCCESS:
      // console.warn('here', 'CREATE_CLASS_SUCCESS')
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case CREATE_CLASS_FAIL:
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
