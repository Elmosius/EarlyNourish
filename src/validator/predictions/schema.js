const Joi = require('joi');

const PostPredictionPayloadSchema = Joi.object({
  jk: Joi.string().valid('L', 'P').required(), 
  bbLahir: Joi.number().min(0).required(),
  tbLahir: Joi.number().min(0).required(),
  umur: Joi.number().integer().min(0).required(),
  bb: Joi.number().min(0).required(),
  tb: Joi.number().min(0).required(),
});

module.exports = {
  PostPredictionPayloadSchema,
};