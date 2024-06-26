// actions.js
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


export const signupRequest = (userData) => ({
  type: SIGNUP_REQUEST,
  payload: userData,
});


// src/redux/authActions.js
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
