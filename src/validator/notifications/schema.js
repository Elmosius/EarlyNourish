const Joi = require('joi');

const PostSubscribeSchema = Joi.object({
  endpoint: Joi.string().uri().required(),
  keys: Joi.object({
    p256dh: Joi.string().required(),
    auth: Joi.string().required(),
  }).required(),
});

const DeleteSubscribeSchema = Joi.object({
  endpoint: Joi.string().uri().required(),
});

module.exports = {
  PostSubscribeSchema,
  DeleteSubscribeSchema,
};