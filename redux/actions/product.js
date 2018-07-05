// product.js
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  PURCHASE_GOLD,
  PURCHASE_GOLD_SUCCESS,
  PURCHASE_GOLD_FAIL,

} from '../types';

import { Observable } from 'rxjs/Observable';

export function getProductList(lastProductId) {
  return {
    type: GET_PRODUCT_LIST,
    payload: {
      lastStartKey: lastProductId,
    }
  }
}


export const getProductListEpic = (action$, store, { request }) =>
  action$.ofType(GET_PRODUCT_LIST)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/getProductList',
        method: 'post',
        data: {
          ...action.payload,
        } 
      }))
      .map(res => {
        // console.warn('login success', res)
        return {
          type: GET_PRODUCT_LIST_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: GET_PRODUCT_LIST_FAIL,
        payload: err.message
      }))
    )

export function purchaseGold(userId, productId) {
  return {
    type: PURCHASE_GOLD,
    payload: {
      userId,
      productId: productId,
    }
  }
}


export const purchaseGoldEpic = (action$, store, { request }) =>
  action$.ofType(PURCHASE_GOLD)
    .mergeMap(action => 
      Observable.fromPromise(request({
        url: '/purchaseGold',
        method: 'post',
        data: {
          ...action.payload,
        } 
      }))
      .map(res => {
        // console.warn('login success', res)
        return {
          type: PURCHASE_GOLD_SUCCESS,
          payload: res.data
        }
      })
      .catch(err => Observable.of({
        type: PURCHASE_GOLD_FAIL,
        payload: err.message
      }))
    )