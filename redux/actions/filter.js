import * as types from '../types';

export function setKeyword(keyword) {
  return {
    type: 'SET_KEYWORD',
    payload: keyword
  };
}

export function setAddress(address) {
  return {
    type: 'SET_ADDRESS',
    payload: address
  };
}
