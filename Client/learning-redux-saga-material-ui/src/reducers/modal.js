import * as types from "./../constants/modal";

const initialState = {
  showModal: false,
  component: null,
  title: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }
    case types.HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
        title:'',
        component: null
      };
    }
    case types.CHANGE_MODEL_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title: title,
      };
    }
    case types.CHANGE_MODAL_CONTENT: {
      const { component } = action.payload;
      return {
        ...state,
        component: component,
      };
    }
    default:
      return state;
  }
};

export default reducer;
