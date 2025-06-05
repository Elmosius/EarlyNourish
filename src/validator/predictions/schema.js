const Joi = require('joi');

const daftarProvinsi = [
  'Aceh', 'Bali', 'Banten', 'Bengkulu', 'DI Yogyakarta', 'DKI Jakarta',
  'Gorontalo', 'Jambi', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Kalimantan Barat',
  'Kalimantan Selatan', 'Kalimantan Tengah', 'Kalimantan Timur', 'Kalimantan Utara',
  'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'Lampung', 'Maluku', 'Maluku Utara',
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Papua', 'Papua Barat', 'Riau',
  'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tengah', 'Sulawesi Tenggara',
  'Sulawesi Utara', 'Sumatera Barat', 'Sumatera Selatan', 'Sumatera Utara'
];

const PostPredictionPayloadSchema = Joi.object({
  provinsi: Joi.string().valid(...daftarProvinsi).required(),
  jenisKelamin: Joi.string().valid('p', 'l').required(),
  usiaBayiBulan: Joi.number().integer().min(0).required(),
  bbLahir: Joi.number().min(0).required(),
  tbLahir: Joi.number().min(0).required(),
  asiEksklusifBulan: Joi.number().integer().min(0).required(),
  lingkarKepala: Joi.number().min(0).required(),
  lahirPrematur: Joi.string().valid('ya', 'tidak').required(),
  usiaIbu: Joi.number().min(0).required(),
  tinggiIbu: Joi.number().min(0).required(),
  bmiIbu: Joi.number().min(0).required(),
  pendidikanIbu: Joi.string().valid('sd', 'smp', 'sma', 'perguruan_tinggi', 'tidak_sekolah').required(),
  sanitasiLayak: Joi.string().valid('layak', 'tidak_layak').required(),
  airMinumLayak: Joi.string().valid('layak', 'tidak_layak').required(),
  statusImunisasi: Joi.string().valid('lengkap', 'sebagian', 'tidak').required(),
});

module.exports = {
  PostPredictionPayloadSchema,
};