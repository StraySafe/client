import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'reducers'
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

const persistor = persistStore(store)


export {
  store, 
  persistor
}