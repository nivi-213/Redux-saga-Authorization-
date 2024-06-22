// store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './authSlice'; // Adjust path as needed
import rootSaga from './Saga'; // Adjust path as needed

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Redux store with combined reducers and middleware
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
