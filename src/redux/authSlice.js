// reducers.js
import { SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE   } from '../action/authAction';

const initialState = {
  isAdminExists: false,
  message: '',
  errors: {},
  user: null,
  loading: false,
  error: null,
  users: [],


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
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
      

    default:
      return state;
  }
};

export default signupReducer;
