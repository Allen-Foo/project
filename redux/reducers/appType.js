

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
    default:
      return state
  }
}

export default currentApp;