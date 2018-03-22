import {
  CREATE_CLASS,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAIL,
  EDIT_CLASS,
  GET_CLASS_DETAIL,
  GET_CLASS_DETAIL_SUCCESS,
  GET_CLASS_DETAIL_FAIL,
  UPDATE_CLASS,
  UPDATE_CLASS_SUCCESS,
  UPDATE_CLASS_FAIL,
  DELETE_CLASS,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAIL,
  GET_ALL_CLASS_LIST,
  GET_ALL_CLASS_LIST_SUCCESS,
  GET_ALL_CLASS_LIST_FAIL,
  SEARCH_CLASS_LIST,
  SEARCH_CLASS_LIST_FAIL,
  SEARCH_CLASS_LIST_SUCCESS,
  GIVE_COMMENT,
  GIVE_COMMENT_SUCCESS,
  GIVE_COMMENT_FAIL,
  GET_FAVOURITE_CLASS_LIST,
  GET_FAVOURITE_CLASS_LIST_FAIL,
  GET_FAVOURITE_CLASS_LIST_SUCCESS,
  REQUIRE_UPDATE_CLASS_LIST,
} from '../types';

const defaultState = {
  classList: [],
  allClassList: [],
  classDetail: null,
  requireUpdateClassList: null,
  filteredClassList: [],
}

// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      // console.warn('here', 'CREATE_CLASS')
      return {
        ...state,
        requireUpdateClassList: false,
        isLoading: true,
      }
    case CREATE_CLASS_SUCCESS:
      // console.warn('here', 'CREATE_CLASS_SUCCESS')
      return {
        ...state,
        isLoading: false,
        requireUpdateClassList: true,
        ...action.payload,
      };
    case CREATE_CLASS_FAIL:
      return {
        ...state,
        isLoading: false,
        requireUpdateClassList: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_CLASS_LIST:
      // console.warn('here', 'GET_CLASS_LIST')
      return {
        ...state,
        isLoading: true,
        classList: [],
      }
    case GET_CLASS_LIST_SUCCESS:
      // console.warn('here', 'GET_CLASS_LIST_SUCCESS', action.payload)
      return {
        ...state,
        isLoading: false,
        classList: action.payload.classList,
        requireUpdateClassList: false,
      };
    case GET_CLASS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        requireUpdateClassList: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case EDIT_CLASS:
      return {
        ...state,
        classDetail: {
          ...state.classDetail,
          ...action.payload
        }
      }
     case GET_CLASS_DETAIL:
      // console.warn('here', 'GET_CLASS_DETAIL')
      return {
        ...state,
        isLoading: true,
        classDetail: null,
      }
    case GET_CLASS_DETAIL_SUCCESS:
      // console.warn('here', 'GET_CLASS_DETAIL_SUCCESS', action.payload)
      return {
        ...state,
        isLoading: false,
        classDetail: action.payload,
      };
    case GET_CLASS_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case UPDATE_CLASS:
      return {
        ...state,
        isLoading: true,
        classDetail: null,
        requireUpdateClassList: false,
      }
    case UPDATE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requireUpdateClassList: true,
        classDetail: action.payload,
      };
    case UPDATE_CLASS_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        requireUpdateClassList: false,
        fetchErrorLastUpdate: new Date(),
      }
    case DELETE_CLASS:
      return {
        ...state,
        isLoading: true,
        requireUpdateClassList: false,
      }
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requireUpdateClassList: true,
        classDetail: null,
      };
    case DELETE_CLASS_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        requireUpdateClassList: false,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_ALL_CLASS_LIST:
      // console.warn('here', 'GET_CLASS_LIST')
      return {
        ...state,
        createClassSuccess: false,
        isLoading: true,
      }
    case GET_ALL_CLASS_LIST_SUCCESS:
       //console.warn('here', 'GET_ALL_CLASS_LIST_SUCCESS', action.payload.classList)
      return {
        ...state,
        isLoading: false,
        createClassSuccess: true,
        allClassList: action.payload.classList,
      };
    case GET_ALL_CLASS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        createClassSuccess: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
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
    case GET_FAVOURITE_CLASS_LIST:
      // console.warn('here', 'GET_FAVOURITE_CLASS_LIST')
      return {
        ...state,
        isLoading: true,
      }
    case GET_FAVOURITE_CLASS_LIST_SUCCESS:
       // console.warn('here', 'GET_FAVOURITE_CLASS_LIST_SUCCESS', action.payload.classList)
      return {
        ...state,
        isLoading: false,
        requireUpdateClassList: false,
        favouriteClassList: action.payload.classList,
      };
    case GET_FAVOURITE_CLASS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GIVE_COMMENT:
      return {
        ...state,
        isLoading: true,
      }
    case GIVE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classDetail: action.payload,
      };
    case GIVE_COMMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case REQUIRE_UPDATE_CLASS_LIST:
       // console.warn('here', 'REQUIRE_UPDATE_CLASS_LIST')
      return {
        ...state,
        requireUpdateClassList: true,
      }
    default:
      return state
  }
}
