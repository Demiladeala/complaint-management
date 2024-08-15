import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Request interceptor to attach access token to headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/token/refresh`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${refreshToken}`
            }
          }
        );      

        // Save new tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Update the original request's Authorization header
        originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError:any) {
        if (refreshError.response.status === 401) {
          // Refresh token expired, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }

    // Show error message
    // toast.error(error.response?.data?.message || "Something went wrong. Please try again.");

    return Promise.reject(error);
  }
);

export default api;