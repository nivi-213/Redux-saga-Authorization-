
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  signupUser,

} from '../server/api';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

} from '../action/authAction';

function* signupSaga(action) {
  try {
    const response = yield call(signupUser, action.payload);
    yield put({ type: SIGNUP_SUCCESS, payload: response.data });
    // Handle navigation inside the component based on the state
  } catch (error) {
    if (error.response) {
      const errorList = error.response.data.error.errorList;
      const newErrors = {};
      errorList.forEach((err) => {
        if (err.includes('Duplicate phone number')) {
          newErrors.mobileNo = 'This mobile number is already registered.';
        } else if (err.includes('user email')) {
          newErrors.email = 'This email is already registered.';
        } else if (err.includes('user name')) {
          newErrors.userName = 'This username is already taken.';
        } else if (err.includes('user password')) {
          newErrors.password = 'This password is already in use.';
        } else if (err.includes('role is not applicable')) {
          newErrors.userRole = "Role 'Admin' is not applicable for registration.";
        }
      });
      yield put({ type: SIGNUP_FAILURE, payload: newErrors });
    } else {
      yield put({ type: SIGNUP_FAILURE, payload: { general: 'Something went wrong. Please try again.' } });
    }
  }
}



export default function* rootSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);

}
