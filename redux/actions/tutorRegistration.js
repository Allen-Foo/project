import {
  SET_OFFERCLASS,
} from '../types'

export function setOfferClass(offerClass) {
  return {
    type: SET_OFFERCLASS,
    payload: offerClass
  };
}