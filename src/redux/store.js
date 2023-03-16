// import {createStore, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
if (__DEV__) {
  middlewares.push(logger);
}

// const store = createStore(persistedReducer, applyMiddleware(...middlewares));

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
const persistor = persistStore(store);

export {store, persistor};
