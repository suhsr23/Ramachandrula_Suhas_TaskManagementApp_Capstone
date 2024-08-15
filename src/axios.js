import axios from 'axios';

// Create an Axios instance with custom configuration
const instance = axios.create({
  baseURL: 'http://localhost:5001', // Backend URL
});

// Automatically include the Authorization header if a token is present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
