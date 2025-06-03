const Joi = require('joi');

const PostPredictionPayloadSchema = Joi.object({
  jenisKelamin: Joi.string().valid('pria', 'wanita').required(),
  usia: Joi.number().integer().min(0).required(),
  bbLahir: Joi.number().min(0).required(),
  tbLahir: Joi.number().min(0).required(),
  beratBadan: Joi.number().min(0).required(),
  tinggiBadan: Joi.number().min(0).required(),
});

module.exports = {
  PostPredictionPayloadSchema,
};