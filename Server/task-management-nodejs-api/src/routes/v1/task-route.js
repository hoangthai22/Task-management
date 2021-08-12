import express from "express";
// import { BoardController } from "../../controllers/BoardController.js";
import jwt from "jsonwebtoken";
import { TaskValidation } from "./../../validations/tasks-validation.js";
import { TaskController } from "./../../controllers/TaskController.js";
import { authenToken } from "./../../middleware/index.js";

const router = express.Router();

router.route("/tasks/filter").get(TaskController.filter);
router.route("/tasks").get(authenToken, TaskController.getAllTask);
router.route("/tasks").post(authenToken,TaskValidation.createNew, TaskController.createNew);
router.route("/tasks/:id").put(authenToken,TaskValidation.update, TaskController.update);
router.route("/tasks/:id").delete(authenToken, TaskController.remove);

export const TasksRoutes = router;
