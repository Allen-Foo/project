import { AsyncStorage } from 'react-native';
import * as types from '../types';
import { languageKeyName } from '../../lib/locale';

export function setLanguage(language) {
  // AsyncStorage.setItem(languageKeyName, language)
  return {
    type: types.SET_LANGUAGE,
    language
  };
}