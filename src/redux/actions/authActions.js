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

export const refreshToken = () => async (dispatch) => {
  try {
    const data = await authService.refreshToken();
    dispatch({ type: 'REFRESH_TOKEN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REFRESH_TOKEN_FAIL', payload: error });
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const data = await authService.resetPassword(email);
    dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'RESET_PASSWORD_FAIL', payload: error });
  }
};

export const verifyEmail = (email) => async (dispatch) => {
  try {
    const data = await authService.verifyEmail(email);
    dispatch({ type: 'VERIFY_EMAIL_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'VERIFY_EMAIL_FAIL', payload: error });
  }
};

export const verifyEmailOTP = (email, email_otp) => async (dispatch) => {
  try {
    const data = await authService.verifyEmailOTP(email, email_otp);
    dispatch({ type: 'VERIFY_EMAIL_OTP_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'VERIFY_EMAIL_OTP_FAIL', payload: error });
  }
};
