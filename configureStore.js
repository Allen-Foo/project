import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux/reducers';
import { languageKeyName, defaultLanguageKey } from './lib/locale';
import languagesConfig from './lib/locale/languages';
import { setLanguage } from './redux/actions'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    )
  );
  return createStore(reducer, initialState, enhancer);
}

//Create the store (as a singleton, this module will always return this same instance of the store)
const store = configureStore({});

//Load the user prefered language from local storage (or use default language if there is no language pre-selection)
//Once the language is loaded the store itself dispatch the action to update the language congifuration
AsyncStorage.getItem(languageKeyName).then(languageKey => {
  let key = languageKey || defaultLanguageKey;
  // console.warn('key', key)
  global.locale = languagesConfig[key]
  // console.warn('global.locale', global.locale)
  store.dispatch(setLanguage(key));
})

export default store;