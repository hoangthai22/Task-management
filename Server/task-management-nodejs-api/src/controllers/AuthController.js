import { AuthService } from "../services/auth-service.js";
import { HttpStatusCode } from "./../utils/constants.js";

import doenv from "dotenv";
doenv.config();

const checkLogin = async (req, res) => {
  try {
    const result = await AuthService.checkLogin(req.body);
    console.log("result" + result);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(401).send({
      message: error.toString(),
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);
    const result = await AuthService.refreshToken(data);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.UNAUTHORIZED).send({ message: error.toString() });
  }
};

const accessToken = async (req, res) => {
  try {
    const data = req.body;
    const result = await AuthService.accessToken(data);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.UNAUTHORIZED).send({
      errors: error.toString(),
    });
  }
};

const logout = async (req, res) => {
  try {
    const data = req.body.token;
    const result = await AuthService.logout(data);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.UNAUTHORIZED).send({
      errors: error.toString(),
    });
  }
};

const signup = async (req, res) => {
  try {
    const data = req.body;
    const result = await AuthService.signup(data);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.NOT_FOUND).send({
      message: error.toString(),
    });
  }
};

export const AuthController = {
  checkLogin,
  refreshToken,
  accessToken,
  logout,
  signup,
};
