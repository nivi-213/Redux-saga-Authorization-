
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
import { takeLatest, call, put } from 'redux-saga/effects';
import { signupUser, loginUser } from '../server/api';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  
} from '../action/authAction';

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

// Login saga
function* loginSaga(action) {
  try {
    const response = yield call(loginUser, {
      userName: action.payload.fullName,
      password: action.payload.password,
    });

    const responseBody = response.data.data.body;

    if (responseBody && responseBody.jwt) {
      localStorage.setItem('token', responseBody.jwt);
      localStorage.setItem('username', responseBody.userName);
      yield put({ type: LOGIN_SUCCESS, payload: responseBody });
    } else {
      yield put({ type: LOGIN_FAILURE, payload: 'User not found or invalid credentials.' });
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: 'Error logging in. Please try again.' });
  }
}

// Root saga
export default function* rootSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
