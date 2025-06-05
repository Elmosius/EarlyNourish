const mongoose = require('mongoose');
const axios = require('axios');
const History = require('../../models/history.model');
const Prediction = require('../../models/prediction.model');
const User = require('../../models/user.model');
const PredictionsValidator = require('../../validator/predictions');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const createPredictionHandlerImpl = async (request, h) => {
  PredictionsValidator.validatePostPredictionPayload(request.payload);

  const {
    provinsi,
    jenisKelamin,
    usiaBayiBulan,
    bbLahir,
    tbLahir,
    asiEksklusifBulan,
    lingkarKepala,
    lahirPrematur,
    usiaIbu,
    tinggiIbu,
    bmiIbu,
    pendidikanIbu,
    sanitasiLayak,
    airMinumLayak,
    statusImunisasi,
  } = request.payload;

  const userIdString = request.auth.credentials.userId;
  const userDoc = await User.findById(userIdString);
  if (!userDoc) {
    throw new InvariantError('User tidak ditemukan');
  }

  const mlApiUrl = process.env.ML_API_URL;
  if (!mlApiUrl || mlApiUrl.trim() === '') {
    throw new ClientError('Variabel ML_API_URL belum di‐set di .env', 400);
  }

  const mlPayload = {
    provinsi,
    jenisKelamin,
    usiaBayiBulan,
    bbLahir,
    tbLahir,
    asiEksklusifBulan,
    lingkarKepala,
    lahirPrematur,
    usiaIbu,
    tinggiIbu,
    bmiIbu,
    pendidikanIbu,
    sanitasiLayak,
    airMinumLayak,
    statusImunisasi,
  };

  let mlResult;
  try {
    const mlResponse = await axios.post(
      mlApiUrl,
      mlPayload,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000, 
      }
    );
    mlResult = mlResponse.data;
    if (
      !mlResult ||
      typeof mlResult.stuntingRisk !== 'string' ||
      !Array.isArray(mlResult.rekomendasi) ||
      !Array.isArray(mlResult.nutrisi)
    ) {
      throw new Error('ML API merespons format yang tidak sesuai');
    }
  } catch (err) {
    console.error('Error saat memanggil ML API:', err.message || err);
    throw new ClientError('Gagal memproses prediksi ke ML API', 400);
  }

  const newHistory = await new History({ userId: userDoc._id }).save();

  const prediction = new Prediction({
    historyId: newHistory._id,
    provinsi,
    jenisKelamin,
    usiaBayiBulan,
    bbLahir,
    tbLahir,
    asiEksklusifBulan,
    lingkarKepala,
    lahirPrematur,
    usiaIbu,
    tinggiIbu,
    bmiIbu,
    pendidikanIbu,
    sanitasiLayak,
    airMinumLayak,
    statusImunisasi,
    stuntingRisk: mlResult.stuntingRisk,
    rekomendasi: mlResult.rekomendasi,
    nutrisi: mlResult.nutrisi,
  });
  await prediction.save();

  return h.response({
    Error: false,
    Message: 'success',
    Result: {
      stuntingRisk: prediction.stuntingRisk,
      rekomendasi: prediction.rekomendasi,
      nutrisi: prediction.nutrisi,
    },
  }).code(201);
};

const createPredictionHandler = async (request, h) => {
  try {
    return await createPredictionHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    if (err instanceof InvariantError || err instanceof NotFoundError) {
      return h.response({ Error: true, Message: err.message }).code(400);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal menyimpan prediksi' }).code(500);
  }
};

const getPredictionByIdHandlerImpl = async (request, h) => {
  const { idUser, idPredict } = request.params;
  if (!mongoose.Types.ObjectId.isValid(idUser) || !mongoose.Types.ObjectId.isValid(idPredict)) {
    throw new InvariantError('ID tidak valid');
  }

  const history = await History.findOne({ _id: idPredict, userId: idUser });
  if (!history) {
    return h.response({ Error: true, Message: 'Data prediksi tidak ditemukan' }).code(404);
  }

  const prediction = await Prediction.findOne({ historyId: idPredict });
  if (!prediction) {
    return h.response({ Error: true, Message: 'Data prediksi tidak ditemukan' }).code(404);
  }

  return h.response({
    Error: false,
    Message: 'success',
    Result: {
      Id: prediction._id,
      provinsi: prediction.provinsi,
      jenisKelamin: prediction.jenisKelamin,
      usiaBayiBulan: prediction.usiaBayiBulan,
      bbLahir: prediction.bbLahir,
      tbLahir: prediction.tbLahir,
      asiEksklusifBulan: prediction.asiEksklusifBulan,
      lingkarKepala: prediction.lingkarKepala,
      lahirPrematur: prediction.lahirPrematur,
      usiaIbu: prediction.usiaIbu,
      tinggiIbu: prediction.tinggiIbu,
      bmiIbu: prediction.bmiIbu,
      pendidikanIbu: prediction.pendidikanIbu,
      sanitasiLayak: prediction.sanitasiLayak,
      airMinumLayak: prediction.airMinumLayak,
      statusImunisasi: prediction.statusImunisasi,
      stuntingRisk: prediction.stuntingRisk,
      rekomendasi: prediction.rekomendasi,
      nutrisi: prediction.nutrisi,
      createdAt: prediction.createdAt,
      updatedAt: prediction.updatedAt,
    },
  }).code(200);
};

const getPredictionByIdHandler = async (request, h) => {
  try {
    return await getPredictionByIdHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof InvariantError) {
      return h.response({ Error: true, Message: err.message }).code(400);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil data prediksi' }).code(500);
  }
};

module.exports = {
  createPredictionHandler,
  getPredictionByIdHandler,
};
