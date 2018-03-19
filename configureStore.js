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

//Load the user prefered language from local storage (or use default language if there is no language pre-selection)
//Once the language is loaded the store itself dispatch the action to update the language congifuration
AsyncStorage.getItem(languageKeyName).then(languageKey => {
  let key = languageKey || defaultLanguageKey;
  // console.warn('key', key)
  window.locale = languagesConfig[key]
  // console.warn('global.locale', global.locale)
  store.dispatch(setLanguage(key));
})

export { store, persistor }