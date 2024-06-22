// // reducers/authReducer.js

// import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../action/authType';

// const initialState = {
//   registering: false,
//   error: null,
//   formData: {}, 
// };

// export default function authReducer(state = initialState, action) {
//   switch (action.type) {
//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         registering: false,
//         error: null,
//       };
//     case REGISTER_FAILURE:
//       return {
//         ...state,
//         registering: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// }
import { combineReducers } from 'redux';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../action/authAction';

const initialState = {
  loading: false,
  message: '',
  errors: {},
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'User registered successfully!',
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.error,
      };
    default:
      return state;
  }
};

export default combineReducers({
  signup: signupReducer,
});
