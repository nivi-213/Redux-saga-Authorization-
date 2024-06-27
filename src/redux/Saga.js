// import { takeLatest, call, put } from 'redux-saga/effects';
// import {
//   signupUser,
//   loginUser
// } from '../server/api';
// import {
//   SIGNUP_REQUEST,
//   SIGNUP_SUCCESS,
//   SIGNUP_FAILURE,

// } from '../action/authAction';

// function* signupSaga(action) {
//   try {
//     const response = yield call(signupUser, action.payload);
//     yield put({ type: SIGNUP_SUCCESS, payload: response.data });
//     // Handle navigation inside the component based on the state
//   } catch (error) {
//     if (error.response) {
//       const errorList = error.response.data.error.errorList;
//       const newErrors = {};
//       errorList.forEach((err) => {
//         if (err.includes('Duplicate phone number')) {
//           newErrors.mobileNo = 'This mobile number is already registered.';
//         } else if (err.includes('user email')) {
//           newErrors.email = 'This email is already registered.';
//         } else if (err.includes('user name')) {
//           newErrors.userName = 'This username is already taken.';
//         } else if (err.includes('user password')) {
//           newErrors.password = 'This password is already in use.';
//         } else if (err.includes('role is not applicable')) {
//           newErrors.userRole = "Role 'Admin' is not applicable for registration.";
//         }
//       });
//       yield put({ type: SIGNUP_FAILURE, payload: newErrors });
//     } else {
//       yield put({ type: SIGNUP_FAILURE, payload: { general: 'Something went wrong. Please try again.' } });
//     }
//   }
// }

// try {
//   const response = yield call(loginUser {
//     userName: action.payload.fullName,
//     password: action.payload.password,
//   });

//   const responseBody = response.data.data.body;

//   if (responseBody && responseBody.jwt) {
//     localStorage.setItem('token', responseBody.jwt);
//     localStorage.setItem('username', responseBody.userName);

//     yield put(loginSuccess(responseBody));
//   } else {
//     yield put(loginFailure('User is not Found'));
//   }
// } catch (error) {
//   yield put(loginFailure('Error logging in'));
// }

// export default function* rootSaga() {
//   yield takeLatest(SIGNUP_REQUEST, signupSaga);
//   yield takeLatest(LOGIN_REQUEST, loginSaga);

// }
import axios from "axios";

import { takeLatest, call, put } from "redux-saga/effects";
import { signupUser, loginUser } from "../server/api";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,

  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,


} from "../action/authAction";

// Signup saga
function* signupSaga(action) {
  try {
    const response = yield call(signupUser, action.payload);
    yield put({ type: SIGNUP_SUCCESS, payload: response.data });
    // Handle navigation or other actions upon successful signup
  } catch (error) {
    if (error.response) {
      const errorList = error.response.data.error.errorList;
      const newErrors = {};
      errorList.forEach((err) => {
        if (err.includes("Duplicate phone number")) {
          newErrors.mobileNo = "This mobile number is already registered.";
        } else if (err.includes("user email")) {
          newErrors.email = "This email is already registered.";
        } else if (err.includes("user name")) {
          newErrors.userName = "This username is already taken.";
        } else if (err.includes("user password")) {
          newErrors.password = "This password is already in use.";
        } else if (err.includes("role is not applicable")) {
          newErrors.userRole =
            "Role 'Admin' is not applicable for registration.";
        }
      });
      yield put({ type: SIGNUP_FAILURE, payload: newErrors });
    } else {
      yield put({
        type: SIGNUP_FAILURE,
        payload: { general: "Something went wrong. Please try again." },
      });
    }
  }
}

// Login saga
function* loginSaga(action) {
  try {
    const response = yield call(loginUser, {
      email: action.payload.email,
      password: action.payload.password,
    });

    const responseBody = response.data.data.body;

    if (responseBody && responseBody.jwt) {
      localStorage.setItem("token", responseBody.jwt);
      localStorage.setItem("email", responseBody.email);
      yield put({ type: LOGIN_SUCCESS, payload: responseBody });
    } else {
      yield put({
        type: LOGIN_FAILURE,
        payload: "User not found or invalid credentials.",
      });
    }
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: "Error logging in. Please try again.",
    });
  }
}
function* fetchAdmin() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in local storage");
    }

    const response = yield call(
      axios.get,
      "http://localhost:8080/api/admin/getAllusers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
}
function* fetchUserSaga(action) {
  try {
    const { useremail } = action.payload;
    const token = localStorage.getItem('token');

    const response = yield call(axios.get, `http://localhost:8080/api/user/getUser/${useremail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USER_FAILURE, payload: error.response?.data || { message: 'Unknown error occurred' } });
  }
}

function* updateUserSaga(action) {
  try {
    const token = localStorage.getItem('token');

    const response = yield call(axios.put, `http://localhost:8080/api/user/update`, action.payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, payload: error.response?.data || { message: 'Unknown error occurred' } });
  }
}

function* deleteUserSaga(action) {
  try {
    const { email } = action.payload;
    const token = localStorage.getItem('token');

    yield call(axios.delete, `http://localhost:8080/api/user/deleteUser/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, payload: error.response?.data || { message: 'Unknown error occurred' } });
  }
}



// Root saga
export default function* rootSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(FETCH_USERS_REQUEST, fetchAdmin);
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);

}
