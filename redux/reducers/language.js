
import languagesConfig from '../../lib/locale/languages';
import { defaultLanguageKey } from '../../lib/locale';

const defaultState = {
  key: defaultLanguageKey,
  locale: languagesConfig[defaultLanguageKey]
}

const language = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        locale: languagesConfig[action.language],
        key: action.language,
      }
    default:
      return state
  }
}

export default language;