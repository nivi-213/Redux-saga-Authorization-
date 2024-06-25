// reducers.js
import { SIGNUP_SUCCESS, SIGNUP_FAILURE,   } from '../action/authAction';

const initialState = {
  isAdminExists: false,
  message: '',
  errors: {},
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, message: 'User registered successfully!', errors: {} };
    case SIGNUP_FAILURE:
      return { ...state, message: '', errors: action.payload };
    // case CHECK_ADMIN_EXISTS_SUCCESS:
    //   return { ...state, isAdminExists: action.payload };
    // case CHECK_ADMIN_EXISTS_FAILURE:
    //   return { ...state, errors: { ...state.errors, adminCheck: 'Error checking admin existence' } };
    default:
      return state;
  }
};

export default signupReducer;
