import axios from 'axios';
import api from '../api';

const authService = {
  login: async (formData) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/login/`, formData);
      localStorage.clear();
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/register/`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await axios.post(`${api.baseUrl}/account/refresh/`, { refresh: refreshToken });
      localStorage.setItem('access_token', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  },

  isAuthenticated: () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
  }

  // You can add other authentication-related methods as needed
};

export default authService;
