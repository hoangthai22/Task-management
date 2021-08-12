import * as types from "./../constants/ui";

const initialState = {
  showLoading: false,
  showSideBar: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case types.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      };
    }
    case types.SHOW_SIDEBAR: {
      return {
        ...state,
        showSideBar: true,
      };
    }
    case types.HIDE_SIDEBAR: {
      return {
        ...state,
        showSideBar: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
