import {
  SIGN_OUT_SUCCESS,
} from '../types';

const defaultState = {
  mode: 'learner',
}

const currentApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_APP_TYPE':
      return {
        ...state,
        mode: action.payload.appType,
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

export default currentApp;