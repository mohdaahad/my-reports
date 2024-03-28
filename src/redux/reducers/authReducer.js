const initialState = {
  isAuthenticated: window.sessionStorage.getItem('access_token') ? true : false,
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

    default:
      return state;
  }
};

export default authReducer;
