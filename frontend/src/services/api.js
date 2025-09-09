import axios from 'axios';

const api = axios.create({
  baseURL: "https://habit-tracker-7tah.onrender.com/api", // This must be the correct URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;