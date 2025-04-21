import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('CSRF-TOKEN='))
      ?.split('=')[1];

    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
