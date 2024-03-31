import axios from '../interceptors/axios';
import api from '../api';

const authService = {
  // Authenticate user and store tokens
  login: async (formData) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/user-login/`, formData);
      authService.storeTokens(response.data);
      return response.data;
    } catch (error) {
      throw authService.handleAPIError(error);
    }
  },

  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/user-register/`, userData);
      return response.data;
    } catch (error) {
      throw authService.handleAPIError(error);
    }
  },

  // Refresh access token
  refreshToken: async () => {
    try {
      const refreshToken = authService.getRefreshToken();
      const response = await axios.post(`${api.baseUrl}/account/refresh/`, { refresh: refreshToken });
      authService.storeAccessToken(response.data.access);
      return response.data;
    } catch (error) {
      throw authService.handleAPIError(error);
    }
  },

  // Initiate password reset
  resetPassword: async (email) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/reset-password-email/`, { email });
      return response.data;
    } catch (error) {
      throw authService.handleAPIError(error);
    }
  },

  // Send email verification
  verifyEmail: async (email) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/verify-email/`, { email });
      return response.data;
    } catch (error) {
      throw authService.handleAPIError(error);
    }
  },

  // Verify email OTP
  verifyEmailOTP: async (email, email_otp) => {
    try {
      const response = await axios.post(`${api.baseUrl}/account/verify-email-otp/`, { email, email_otp });
      return response.data;
    } catch (error) {
      throw authService.handleAPIError(error);
    }
  },

  // Logout user
  logout: async () => {
    authService.clearTokens();
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const accessToken = authService.getAccessToken();
    return !!accessToken;
  },

  // Store access and refresh tokens
  storeTokens: (tokens) => {
    window.localStorage.clear();
    window.localStorage.setItem('access_token', tokens.access);
    window.localStorage.setItem('refresh_token', tokens.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
  },

  // Store access token
  storeAccessToken: (accessToken) => {
    window.localStorage.setItem('access_token', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },

  // Retrieve access token
  getAccessToken: () => {
    return window.localStorage.getItem('access_token');
  },

  // Retrieve refresh token
  getRefreshToken: () => {
    return window.localStorage.getItem('refresh_token');
  },

  // Clear tokens and logout
  clearTokens: () => {
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
  },

  // Handle API errors
  handleAPIError: (error) => {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default authService;
