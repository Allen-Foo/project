
import languagesConfig from '../../lib/locale/languages';
import { defaultLanguageKey } from '../../lib/locale';

const language = (state = languagesConfig[defaultLanguageKey], action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return languagesConfig[action.language]
    default:
      return state
  }
}

export default language;