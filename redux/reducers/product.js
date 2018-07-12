import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  GET_COIN_HISTORY_LIST,
  GET_COIN_HISTORY_LIST_SUCCESS,
  GET_COIN_HISTORY_LIST_FAIL,
  PURCHASE_GOLD,
  PURCHASE_GOLD_SUCCESS,
  PURCHASE_GOLD_FAIL,
} from '../types';

const defaultState = {
  productList: [],
  isLoading: false,
  isPurchaseSuccess: false,
}

// Reducer
export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCT_LIST_SUCCESS:
      // console.warn('here', 'GET_PRODUCT_LIST_SUCCESS', action.payload)
      return {
        ...state,
        isLastProductList: action.payload.isLastProduct,
        isLoading: false,
        productList: action.payload.productList,
      };
    case GET_PRODUCT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case GET_COIN_HISTORY_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COIN_HISTORY_LIST_SUCCESS:
      // console.warn('here', 'GET_PRODUCT_LIST_SUCCESS', action.payload)
      return {
        ...state,
        isLastRecord: action.payload.isLastRecord,
        isLoading: false,
        coinHistoryList: action.payload.coinHistoryList,
      };
    case GET_COIN_HISTORY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    case PURCHASE_GOLD:
      return {
        ...state,
        isPurchaseSuccess: false,
        isLoading: true,
      }
    case PURCHASE_GOLD_SUCCESS:
      // console.warn('here', 'PURCHASE_GOLD_SUCCESS', action.payload)
      return {
        ...state,
        isPurchaseSuccess: true,
        isLoading: false,
      };
    case PURCHASE_GOLD_FAIL:
      return {
        ...state,
        isLoading: false,
        isPurchaseSuccess: false,
        fetchErrorMsg: action.payload,
        fetchErrorLastUpdate: new Date(),
      }
    default:
      return state
  }
}

