const initialState = {
  isAuthenticated: window.localStorage.getItem('access_token') ? true : false,
  accessToken: null,
  refreshToken: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
        error: null,
      };

    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        error: action.payload,
      };

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        error: null,
      };

    case 'LOGOUT_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        error: null,
      };

    case 'REGISTER_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.access,
        error: null,
      };

    case 'REFRESH_TOKEN_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        error: null,
      };

    case 'RESET_PASSWORD_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    case 'VERIFY_EMAIL_SUCCESS':
      return {
        ...state,
        error: null,
      };

    case 'VERIFY_EMAIL_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    case 'VERIFY_EMAIL_OTP_SUCCESS':
      return {
        ...state,
        error: null,
      };

    case 'VERIFY_EMAIL_OTP_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
