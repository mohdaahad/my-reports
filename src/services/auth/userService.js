import axios from 'axios';
import api from '..api/api';

const userService = {
  getUserInfo: async (accessToken) => {
    try {
      const response = await axios.get(`${api.baseUrl}/user/info/`, {
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
      const response = await axios.put(`${api.baseUrl}/user/profile/`, userData, {
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
