// services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const registerUser = (userData) => {
  return api.post('/auth/user/register', userData);
};

export { api, registerUser };
