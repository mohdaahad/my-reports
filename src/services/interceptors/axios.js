import axios from "axios";
import api from '../api';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios.request(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        // Handle the case where refresh token is missing or expired
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${api.baseUrl}/account/refresh/`,
          { refresh: refreshToken }
        );

        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          processQueue(null, response.data.access);
          return axios.request(originalRequest);
        } else {
          // Handle unexpected response status
          processQueue(response.data);
          return Promise.reject(response.data);
        }
      } catch (refreshError) {
        // Handle refresh token request error
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
