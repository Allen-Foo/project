// index.js
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import language from './language';

import apiTest, { doGetEpic, doPostEpic } from '../../api/apiTest'

export const rootReducer = combineReducers({
  language,
  apiTest
})

export const rootEpic = combineEpics(
  doGetEpic,
  doPostEpic
)
