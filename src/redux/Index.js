// sagas/index.js

import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    // Other sagas can be added here
  ]);
}

export default rootSaga;
