// // apiService.js
// import axios from 'axios';

// export const signupUser = (userData) => {
//   return axios.post('http://localhost:8080/api/auth/user/register', userData);
// };

// apiService.js
// src/server/api.js

import axios from 'axios';

export const signupUser = (userData) => {
  return axios.post('http://localhost:8080/api/auth/user/register', userData);
};

export const loginUser = (credentials) => {
  return axios.post('http://localhost:8080/api/auth/user/login', credentials);
};


