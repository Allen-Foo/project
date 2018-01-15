import { AsyncStorage } from 'react-native';
import * as types from '../types';

export function setAppType(type) {
  return {
    type: 'SET_APP_TYPE',
    payload: {
      appType: type
    }
  };
}