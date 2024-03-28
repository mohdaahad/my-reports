import userService from '../../services/auth/userService';

export const getUserInfo = (accessToken) => async (dispatch) => {
  try {
    const data = await userService.getUserInfo(accessToken);
    dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_USER_INFO_FAIL', payload: error });
  }
};

export const updateUserProfile = (accessToken, userData) => async (dispatch) => {
  try {
    const data = await userService.updateUserProfile(accessToken, userData);
    dispatch({ type: 'UPDATE_USER_PROFILE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_PROFILE_FAIL', payload: error });
  }
};
