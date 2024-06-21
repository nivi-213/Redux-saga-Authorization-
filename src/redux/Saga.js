// sagas/authSaga.js

import { takeLatest, call, put } from 'redux-saga/effects';
import {  registerSuccess, registerFailure } from '../action/authAction';
import { REGISTER_REQUEST, } from '../action/authType';

import { api } from '../server/api'; // Assuming you have an API service set up

function* handleRegister(action) {
  try {
    // Call your API to register the user
    const response = yield call(api.post, '/auth/user/register', action.payload);

    // Dispatch a success action if registration was successful
    yield put(registerSuccess());
  } catch (error) {
    // Dispatch a failure action if there was an error
    yield put(registerFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
