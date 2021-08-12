import axiosService from "./../commons/axiosService";
import { API_ENDPOINT } from "./../constants";

//http://localhost:3000/tasks
const url_task = "tasks";
const url_user = "user";
const url_search = "filter?q=";
const url_user_login = "login"

export const getList = (headerParams) => {
  return axiosService.get(`${API_ENDPOINT}/${url_task}`, headerParams);
};

//http://localhost:3000/task?q=
export const getListFilter = (keyword, headerParams) => {
  return axiosService.get(`${API_ENDPOINT}/${url_task}/${url_search}${keyword}`,headerParams);
}

//http://localhost:3000/tasks
export const addTask = (data, headerParams) => {
  return axiosService.post(`${API_ENDPOINT}/${url_task}`, data, headerParams);
}

//http://localhost:3000/task/:id
export const updateTask = (data, id, headerParams) => {
  return axiosService.put(`${API_ENDPOINT}/${url_task}/${id}`, data, headerParams);
}

//http://localhost:3000/task/:id
export const deleteTask = (id, headerParams) => {
  return axiosService.delete(`${API_ENDPOINT}/${url_task}/${id}`,headerParams);
}

//http://localhost:5000/v1/user/login
export const checkLogin = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url_user}/${url_user_login}`, data);
}
//http://localhost:5000/v1/user
export const getAccessToken = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url_user}`, data);
}