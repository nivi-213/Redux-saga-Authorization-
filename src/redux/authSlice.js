// reducers/authReducer.js

import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../action/authType';

const initialState = {
  registering: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
