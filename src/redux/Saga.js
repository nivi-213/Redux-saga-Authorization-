// // sagas/authSaga.js

// import { takeLatest, call, put } from 'redux-saga/effects';
// import { registerSuccess, registerFailure } from '../action/authAction';
// import { REGISTER_REQUEST } from '../action/authType';
// import { apiCallToRegister } from '../server/api'; // Adjusted the path

// function* handleRegister(action) {
//   try {

//     const response = yield call(apiCallToRegister, action.payload);

//     yield put(registerSuccess(response));
//   } catch (error) {
 
//     yield put(registerFailure(error.message));
//   }
// }

// export default function* authSaga() {
//   yield takeLatest(REGISTER_REQUEST, handleRegister);
// }
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  SIGNUP_REQUEST,
  signupSuccess,
  signupFailure,
} from '../action/authAction';

function* handleSignup(action) {
  try {
    const response = yield call(
      axios.post,
      'http://localhost:8080/api/auth/user/register',
      action.payload.userData
    );
    const { token } = response.data;
    yield put(signupSuccess(token));
    // Optionally handle localStorage setItem here
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function* signupSaga() {
  yield takeLatest(SIGNUP_REQUEST, handleSignup);
}

export default signupSaga;
