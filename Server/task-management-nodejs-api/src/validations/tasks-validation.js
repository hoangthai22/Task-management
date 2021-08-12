import Joi from "joi";
import { HttpStatusCode } from "./../utils/constants.js";

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    description: Joi.string().required().min(3).max(100).trim(),
    status: Joi.number().integer().required(),
  });
  try {
    console.log('req.body: '+ JSON.stringify(req.body));
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('errorAtValidation: ' + error);
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

const update = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    description: Joi.string().required().min(3).max(100).trim(),
    status: Joi.number().integer().required(),
  });
  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (error) {
    console.log('errorAtValidation: ' + error);
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

export const TaskValidation = { createNew, update };
