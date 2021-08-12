import * as authTypes from "./../constants/auth";

export const login = (username, password) => {
  return {
    type: authTypes.LOGIN,
    payload: {
      username,
      password,
    },
  };
};

export const loginSuccess = (data) => {
  return {
    type: authTypes.LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loginFail = (error) => {
  return {
    type: authTypes.LOGIN_FAIL,
    payload: {
      error,
    },
  };
};


export const logoutSuccess = (data) => {
  return {
    type: authTypes.LOGOUT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const logoutFail = (error) => {
  return {
    type: authTypes.LOGOUT_FAIL,
    payload: {
      error,
    },
  };
};

export const signinSuccess = (data) => {
  return {
    type: authTypes.SIGNIN_SUCCESS,
    payload: {
      data,
    },
  };
};

export const signinFail = (error) => {
  return {
    type: authTypes.SIGNIN_FAIL,
    payload: {
      error,
    },
  };
};

