import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootEpic, rootReducer } from './redux/reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createEpicMiddleware } from 'redux-observable';
import axios from 'axios';

import { languageKeyName, defaultLanguageKey } from './lib/locale';
import languagesConfig from './lib/locale/languages';
import { setLanguage } from './redux/actions';

import appSecrets from './appSecrets';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userProfile'],
  // blacklist: ['language', 'classes', 'filter'] // language will not be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const restClient = axios.create({
  baseURL: appSecrets.aws.apiURL,
  timeout: 15000,
});

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { request: restClient.request },
  // dependencies: {
  //   request: mockRequest,
  // },
});

// add interceptors to handle the response
restClient.interceptors.response.use((response) => {
  switch (response.data.statusCode) {
    case 200:     // API_CODE_OK
      return response;
    default:
      return Promise.reject({type: response.data.statusCode}); 
  }
}, function (error) {
  let errorResponse = {...error.response, type: -1};
  return Promise.reject(errorResponse);
});

function configureStore() {
  const store = createStore(
    persistedReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      epicMiddleware,
    )
  )
 
  return store;
}

const store = configureStore();
let persistor = persistStore(store)

export { store, persistor }