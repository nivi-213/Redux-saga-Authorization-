// sagas/index.js

import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    // Other sagas can be added here
  ]);
}
