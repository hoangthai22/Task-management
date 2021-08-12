import express from "express";
import { AuthRoutes } from "./auth-route.js";
import { TasksRoutes } from "./task-route.js";
import { UserRoutes } from "./user-route.js";


const router = express.Router();

//Get v1/status
router.get("/status", (req, res) =>
  res.status(200).json({
    status: "OK Nha!",
  })
);

router.use("/", TasksRoutes);
router.use("/", AuthRoutes);
router.use("/", UserRoutes);
// router.use("/", TasksRoutes);

export const apiV1 = router;
