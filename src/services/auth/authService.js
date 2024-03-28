import axios from 'axios';
import api from '../api';

const authService = {
  login: async (formData) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/user-login/`, formData);
      window.sessionStorage.clear();
      window.sessionStorage.setItem('access_token', response.data.access);
      window.sessionStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/user-register/`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  refreshToken: async () => {
    const refreshToken = window.sessionStorage.getItem('refresh_token');
    try {
      const response = await axios.post(`${api.baseUrl}/account/refresh/`, { refresh: refreshToken });
      window.sessionStorage.setItem('access_token', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  
  resetPassword: async (email) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/reset-password/`, { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },


  sendOTP: async (email) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/send-otp/`, { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  verifyEmail: async (email) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/verify-email/`, { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  verifyEmailOTP: async (email,otp) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/verify-email-otp/`, { email, otp });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
logout: async () => {
        window.sessionStorage.removeItem('access_token');
        window.sessionStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization'];
  // try {
  //   // Make an API call to the logout endpoint if necessary
  //   const response = await axios.post(`${api.baseUrl}/account/user-logout/`);
  //   if (response.status === 200) {
  //     window.sessionStorage.removeItem('access_token');
  //     window.sessionStorage.removeItem('refresh_token');
  //     delete axios.defaults.headers.common['Authorization'];
  //     return true;
  //   } else {
  //     throw new Error('Logout failed');
  //   }
  // } catch (error) {
  //   throw error.response ? error.response.data : error;
  // }
},

  isAuthenticated: () => {
    const accessToken = window.sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  // You can add other authentication-related methods as needed
};

export default authService;
