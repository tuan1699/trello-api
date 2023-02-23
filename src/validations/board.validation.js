import Joi from "joi";
import { HttpStatusCode } from "*/utilities/constant";

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

const update = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()),
  });

  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    next();
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = { createNew, update };
