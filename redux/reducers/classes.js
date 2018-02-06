import {
  CREATE_CLASS,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAIL,
} from '../types';


const defaultState = {
  classList: [],
  classDetail: null,
  createClassSuccess: null,
}


// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      // console.warn('here', 'CREATE_CLASS')
      return {
        ...state,
        createClassSuccess: false,
        isLoading: true,
      }
    case CREATE_CLASS_SUCCESS:
      // console.warn('here', 'CREATE_CLASS_SUCCESS')
      return {
        ...state,
        isLoading: false,
        createClassSuccess: true,
        ...action.payload,
      };
    case CREATE_CLASS_FAIL:
      return {
        ...state,
        isLoading: false,
        createClassSuccess: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_CLASS_LIST:
      // console.warn('here', 'GET_CLASS_LIST')
      return {
        ...state,
        createClassSuccess: false,
        isLoading: true,
      }
    case GET_CLASS_LIST_SUCCESS:
      console.warn('here', 'GET_CLASS_LIST_SUCCESS', action.payload)
      return {
        ...state,
        isLoading: false,
        createClassSuccess: true,
        classList: action.payload.classList,
      };
    case GET_CLASS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        createClassSuccess: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    default:
      return state
  }
}
