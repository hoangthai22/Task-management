import { TaskService } from "../services/task-service.js";
import { HttpStatusCode } from "./../utils/constants.js";

const createNew = async (req, res) => {
  try {
    const result = await TaskService.createNew(req.body);
    res.status(HttpStatusCode.CREATED).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskService.update(id, req.body);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskService.remove(id);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error,
    });
  }
};

const filter = async (req, res) => {
  try {
    const { q } = req.query;
    console.log('key: ' + q);
    const result = await TaskService.filter(q);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const result = await TaskService.getAllTask();
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error,
    });
  }
};

export const TaskController = { getAllTask, createNew, update, remove, filter };
