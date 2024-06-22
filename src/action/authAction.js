// // src/action/authAction.js

// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// export const REGISTER_FAILURE = 'REGISTER_FAILURE';
// export const REGISTER_REQUEST = 'REGISTER_REQUEST';

// export const registerRequest = (formData) => ({
//   type: REGISTER_REQUEST,
//   payload: formData,
// });

// export const registerSuccess = (data) => ({
//   type: REGISTER_SUCCESS,
//   payload: data,
// });

// export const registerFailure = (error) => ({
//   type: REGISTER_FAILURE,
//   payload: error,
// });





// Action Types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Action Creators
export const signupRequest = (userData) => ({
  type: SIGNUP_REQUEST,
  payload: { userData },
});

export const signupSuccess = (token) => ({
  type: SIGNUP_SUCCESS,
  payload: { token },
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: { error },
});
