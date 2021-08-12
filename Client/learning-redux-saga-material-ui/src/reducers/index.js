import { combineReducers } from "redux";
import taskReducer from "./task";
import uiReducer from "./ui";
import modalReducer from './modal'
import authReducer from './auth'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  task: taskReducer,
  ui: uiReducer,
  modal: modalReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
