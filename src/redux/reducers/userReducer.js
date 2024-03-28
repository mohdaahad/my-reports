const initialState = {
    userInfo: null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USER_INFO_SUCCESS':
        return {
          ...state,
          userInfo: action.payload,
          error: null,
        };
      case 'GET_USER_INFO_FAIL':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_USER_PROFILE_SUCCESS':
        return {
          ...state,
          userInfo: action.payload,
          error: null,
        };
      case 'UPDATE_USER_PROFILE_FAIL':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  