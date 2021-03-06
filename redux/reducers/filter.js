import {
  SET_KEYWORD,
  SET_ADDRESS,
  SET_FILTER,
  SET_SORT,
  SEARCH_CLASS_LIST,
  SEARCH_CLASS_LIST_SUCCESS,
  SEARCH_CLASS_LIST_FAIL,
  SET_CURRENT_LOCATION,
  SIGN_OUT_SUCCESS,
} from '../types'

const defaultState = {
  keyword: '',
  address: '',
  filter: null,
  sort: null,
  isLoading: false,
  filteredClassList: [],
  currentLocation: null,
  isCurrentLocationSelected: false,
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
        address: action.payload.address,
        isCurrentLocationSelected: action.payload.isCurrentLocationSelected
      }
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      }
    case SEARCH_CLASS_LIST:
      // console.warn('here', 'SEARCH_CLASS_LIST')
      return {
        ...state,
        searchClassSuccess: false,
        isLoading: true,
        filteredClassList: []
      }
    case SEARCH_CLASS_LIST_SUCCESS:
       // console.warn('here', 'SEARCH_CLASS_LIST_SUCCESS', action.payload.classList)
      return {
        ...state,
        isLoading: false,
        searchClassSuccess: true,
        filteredClassList: action.payload.classList,
      };
    case SEARCH_CLASS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        searchClassSuccess: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case SIGN_OUT_SUCCESS:
      // console.warn('here', 'SIGN_OUT_SUCCESS')
      return {
        ...defaultState
      };
    default:
      return state
  }
}
