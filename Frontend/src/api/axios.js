//api/axios.jsx

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(

  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config; 
  },
  
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
