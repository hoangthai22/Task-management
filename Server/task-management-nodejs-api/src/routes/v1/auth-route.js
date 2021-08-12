import express from "express";
import { AuthController } from "../../controllers/AuthController.js";
import jwt from "jsonwebtoken";
import doenv from "dotenv";
import { authenToken } from "./../../middleware/index.js";
doenv.config();

const router = express.Router();

router.route("/user").post(AuthController.accessToken);
router.route("/user/refreshToken").post(AuthController.refreshToken);
router.route("/user/logout").post(AuthController.logout);
router.route("/user/login").post(AuthController.checkLogin);
router.route("/user/signup").post(AuthController.signup);


export const AuthRoutes = router;
