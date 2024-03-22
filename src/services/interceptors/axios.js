import axios from "axios";
import api from '../api';
let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        // Handle the case where refresh token is missing or expired
        return Promise.reject(error);
      }
      try {
        const response = await axios.post(
          `${api.baseUrl}/account/refresh/`,
          { refresh: refreshToken },
          
        );
        if (response.status === 200) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          // Retry the original request after token refresh
          return axios(error.config);
        } else {
          // Handle unexpected response status
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Handle refresh token request error
        return Promise.reject(refreshError);
      } finally {
        refresh = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
