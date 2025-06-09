const Joi = require('joi');

const PutProfilePayloadSchema = Joi.object({
  namaLengkap: Joi.string().optional(),
  fotoProfil: Joi.string().optional().allow(null, ''),
  alamat: Joi.string().optional().allow(null, ''),
  namaAnak: Joi.string().optional().allow(''),
  jenisKelamin: Joi.string().valid('p', 'l').optional(),
  tanggalLahir: Joi.date().optional(),
  bbLahir: Joi.number().optional(),
  tbLahir: Joi.number().optional(),
});
module.exports = {
  PutProfilePayloadSchema,
};
