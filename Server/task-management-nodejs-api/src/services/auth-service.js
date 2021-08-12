import { AuthModel } from "../models/auth-model.js";

const checkLogin = async (data) => {
  try {
    const result = await AuthModel.checkLogin(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (data) => {
  try {
    const refreshToken = data.refreshToken;
    if (!refreshToken) throw new Error("UnAuthorization"); //unAuthorization
    const result = await AuthModel.refreshToken(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const accessToken = async (data) => {
  try {
    const result = await AuthModel.accessToken(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const logout = async (data) => {
  try {
    const result = await AuthModel.logout(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const signup = async (data) => {
  try {
    const result = await AuthModel.signup(data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const AuthService = { checkLogin, refreshToken, accessToken, logout, signup };
