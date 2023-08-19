import Joi from 'joi';

export const testSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),

	age: Joi.number().integer().min(18).max(65).required(),
}).options({ abortEarly: false });
