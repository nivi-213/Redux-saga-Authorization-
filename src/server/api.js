// services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const apiCallToRegister = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/user/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network response was not ok');
  }
};
