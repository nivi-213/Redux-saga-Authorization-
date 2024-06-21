// actions/authActions.js

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './authType';

export const registerRequest = (userData) => ({
  type: REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
