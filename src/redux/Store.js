// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './Saga'; // Import your root saga
import authReducer from './authSlice'; // Import your auth reducer

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers here if needed
});

// Apply middleware including saga middleware
const middleware = applyMiddleware(sagaMiddleware);

// Create store with combined reducers, middleware, and Redux DevTools extension
const store = createStore(
  rootReducer,
  middleware
);

// Run your root saga
sagaMiddleware.run(rootSaga);

export default store;
