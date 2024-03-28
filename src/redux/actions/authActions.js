import authService from '../../services/auth/authService';

export const login = (formData) => async (dispatch) => {
  try {
    const data = await authService.login(formData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'LOGOUT_FAIL', payload: error });  
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const data = await authService.register(userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error });
  }
};



