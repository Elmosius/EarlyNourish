const mongoose = require('mongoose');
const History = require('../../models/history.model');
const Prediction = require('../../models/prediction.model');
const User = require('../../models/user.model');
const PredictionsValidator = require('../../validator/predictions');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const createPredictionHandlerImpl = async (request, h) => {
  PredictionsValidator.validatePostPredictionPayload(request.payload);

  const { jenisKelamin, usia, bbLahir, tbLahir, beratBadan, tinggiBadan } = request.payload;
  const userIdString = request.auth.credentials.userId;

  const userDoc = await User.findById(userIdString);
  if (!userDoc) {
    throw new InvariantError('User tidak ditemukan');
  }

  const newHistory = await new History({ userId: userDoc._id }).save();

  const stuntingRisk = await _calculateStuntingRisk({
    jenisKelamin,
    usia,
    bbLahir,
    tbLahir,
    beratBadan,
    tinggiBadan,
  });

  const prediction = new Prediction({
    historyId: newHistory._id,
    jenisKelamin,
    usia,
    bbLahir,
    tbLahir,
    beratBadan,
    tinggiBadan,
    stuntingRisk,
  });
  await prediction.save();

  return h.response({
    Error: false,
    Message: 'success',
    Result: {
      stuntingRisk: prediction.stuntingRisk,
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
    throw new NotFoundError('Data prediksi tidak ditemukan');
  }

  const prediction = await Prediction.findOne({ historyId: idPredict });
  if (!prediction) {
    throw new NotFoundError('Data prediksi tidak ditemukan');
  }

  return h.response({
    Error: false,
    Message: 'success',
    Result: {
      Id: prediction._id,
      jenisKelamin: prediction.jenisKelamin,
      Usia: prediction.usia,
      bbLahir: prediction.bbLahir,
      tbLahir: prediction.tbLahir,
      beratBadan: prediction.beratBadan,
      tinggiBadan: prediction.tinggiBadan,
      stuntingRisk: prediction.stuntingRisk,
      createdAt: prediction.createdAt,
      updatedAt: prediction.updatedAt,
    },
  }).code(200);
};

const getPredictionByIdHandler = async (request, h) => {
  try {
    return await getPredictionByIdHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil data prediksi' }).code(500);
  }
};

async function _calculateStuntingRisk({ jenisKelamin, usia, bbLahir, tbLahir, beratBadan, tinggiBadan }) {
  const ratio = beratBadan / (usia || 1);
  if (ratio < 0.5) return 'high';
  if (ratio < 0.8) return 'medium';
  return 'low';
}

module.exports = {
  createPredictionHandler,
  getPredictionByIdHandler,
};
