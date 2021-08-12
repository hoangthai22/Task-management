import { STATUSES } from "../constants";
import * as taskApis from "./../apis/taskApi";
import * as taskConstants from "./../constants/taskActionType";

export const fetchListTask = () => {
  return {
    type: taskConstants.FETCH_TASK,
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: taskConstants.FETCH_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTaskFail = (error) => {
  return {
    type: taskConstants.FETCH_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const filterTask = (keyword) => {
  return {
    type: taskConstants.FILTER_TASK,
    payload: {
      keyword,
    },
  };
};

export const filterTaskSuccess = (data) => {
  return {
    type: taskConstants.FILTER_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addTask = (title, description) => {
  return {
    type: taskConstants.ADD_TASK,
    payload: {
      title,
      description,
    },
  };
};

export const addTaskSuccess = (data) => {
  return {
    type: taskConstants.ADD_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addTaskFail = (error) => {
  return {
    type: taskConstants.ADD_TASK_FAIL,
    payload: {
      error,
    },
  };
};

export const setTaskEditing = (task) => {
  return {
    type: taskConstants.EDIT_TASK,
    payload: {
      task,
    },
  };
};


export const updateTask = (title, description, status = STATUSES[0].value) => {
  return {
    type: taskConstants.UPDATE_TASK,
    payload: {
      title,
      description,
      status
    },
  };
};

export const updateTaskSuccess = (data) => {
  return {
    type: taskConstants.UPDATE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateTaskFail = (error) => {
  return {
    type: taskConstants.UPDATE_TASK_FAIL,
    payload: {
      error,
    },
  };
};


export const deleteTask = (id) => {
  return {
    type: taskConstants.DELETE_TASK,
    payload: {
      id
    },
  };
};

export const deleteTaskSuccess = (id) => {
  return {
    type: taskConstants.DELETE_TASK_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteTaskFail = (error) => {
  return {
    type: taskConstants.DELETE_TASK_FAIL,
    payload: {
      error,
    },
  };
};