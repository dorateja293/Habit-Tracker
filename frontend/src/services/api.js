import axios from 'axios';

// Create a single axios instance with a base URL
const api = axios.create({
  baseURL: "https://habit-tracker-backend.onrender.com/api",
});

// Add the interceptor to the single 'api' instance
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Export the single, configured 'api' instance
export default api;