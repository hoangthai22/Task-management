import express from "express";
import { UserController } from "./../../controllers/UserController.js";
import { authenToken } from "./../../middleware/index.js";

const router = express.Router();

router.route("/user/:token").get(UserController.getOneUser);

export const UserRoutes = router;
