import axios from 'axios';
import api from '../api';

const userService = {
  getUserProfile: async (accessToken) => {
    try {
      const response = await axios.get(api['user-profile'], {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUserEducation: async (accessToken) => {
    try {
      const response = await axios.get(api['user-education'], {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateUserProfile: async (accessToken, userData) => {
    try {
      const response = await axios.put(api['user-profile'], userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Add other user-related methods as needed
};

export default userService;
