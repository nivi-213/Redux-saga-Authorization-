// actions.js
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
// export const CHECK_ADMIN_EXISTS = 'CHECK_ADMIN_EXISTS';
// export const CHECK_ADMIN_EXISTS_SUCCESS = 'CHECK_ADMIN_EXISTS_SUCCESS';
// export const CHECK_ADMIN_EXISTS_FAILURE = 'CHECK_ADMIN_EXISTS_FAILURE';

export const signupRequest = (userData) => ({
  type: SIGNUP_REQUEST,
  payload: userData,
});

// export const checkAdminExists = () => ({
//   type: CHECK_ADMIN_EXISTS,
// });
