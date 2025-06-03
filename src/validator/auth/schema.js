const Joi = require('joi');

const PostAuthenticationLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const PostAuthenticationRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().required(),
});

module.exports = {
  PostAuthenticationLoginSchema,
  PostAuthenticationRegisterSchema,
};
