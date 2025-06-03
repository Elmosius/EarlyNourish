const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
  fullName: Joi.string().required(),
  namaAnak: Joi.string().optional().allow(''),
  jenisKelamin: Joi.string().valid('male', 'female').optional(),
  namaOrangTua: Joi.string().optional().allow(''),
  tanggalLahir: Joi.date().optional(),
  beratBadan: Joi.number().optional(),
  tinggiBadan: Joi.number().optional(),
});

module.exports = {
  PostUserPayloadSchema,
};
