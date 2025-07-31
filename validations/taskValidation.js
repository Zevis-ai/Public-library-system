import Joi from "joi";

export const taskValidation = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().allow(""),
  dueDate: Joi.date().optional(),
});
