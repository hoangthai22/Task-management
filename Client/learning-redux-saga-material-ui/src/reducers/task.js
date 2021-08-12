import * as taskConstants from "./../constants/taskActionType";
import { toastError,toastSuccess, toastWarn } from "./../helpers/toastHelper";

const initialState = {
  listTask: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK: {
      return {
        ...state,
        listTask: [],
      };
    }
    case taskConstants.FETCH_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case taskConstants.FETCH_TASK_FAIL: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTask: [],
      };
    }
    case taskConstants.FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case taskConstants.UPDATE_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex((item) => item._id === data._id);
      if (index !== -1) {
        const newList = [
          ...listTask.slice(0, index),
          data,
          ...listTask.slice(index + 1),
        ];
        toastWarn('Update successful')
        return {
          ...state,
          listTask: newList,
        };
      }
      
    }
    case taskConstants.UPDATE_TASK_FAIL: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskConstants.EDIT_TASK: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditing: task,
      };
    }
    case taskConstants.ADD_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess('Insert successful')
      return {
        ...state,
        listTask: [data].concat(state.listTask),
      };
    }
    case taskConstants.ADD_TASK_FAIL: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskConstants.DELETE_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.DELETE_TASK_SUCCESS: {
      const { id } = action.payload;
      toastSuccess('Delete successful')
      return {
        ...state,
        listTask: state.listTask.filter(item => item._id !== id)
      };
    }
    case taskConstants.DELETE_TASK_FAIL: {
      const { error } = action.payload;
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
