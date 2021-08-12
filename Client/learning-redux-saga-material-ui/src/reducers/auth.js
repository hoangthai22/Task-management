import * as authConstants from "./../constants/auth";
import { toastError, toastSuccess, toastWarn } from "./../helpers/toastHelper";

const initialState = {
  userInf: {},
  isLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Login successful");
      return {
        ...state,
        userInf: data,
        isLogin: true
      };
    }
    case authConstants.LOGIN_FAIL: {
      const { error } = action.payload;
      console.log('error: ' + error);
      toastError(error);
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reducer;
