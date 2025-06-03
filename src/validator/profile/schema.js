const Joi = require('joi');

const PutProfilePayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  namaAnak: Joi.string().optional().allow(''),
  jenisKelamin: Joi.string().valid('male', 'female').optional(),
  namaOrangTua: Joi.string().optional().allow(''),
  tanggalLahir: Joi.date().optional(),
  beratBadan: Joi.number().optional(),
  tinggiBadan: Joi.number().optional(),
});

module.exports = {
  PutProfilePayloadSchema,
};