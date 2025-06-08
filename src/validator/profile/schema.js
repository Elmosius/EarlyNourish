const Joi = require('joi');

const PutProfilePayloadSchema = Joi.object({
  namaLengkap: Joi.string().optional(),
  namaAnak: Joi.string().optional().allow(''),
  jenisKelamin: Joi.string().valid('p', 'l').optional(),
  namaOrangTua: Joi.string().optional().allow(''),
  tanggalLahir: Joi.date().optional(),
  beratBadan: Joi.number().optional(),
  tinggiBadan: Joi.number().optional(),
});

module.exports = {
  PutProfilePayloadSchema,
};
