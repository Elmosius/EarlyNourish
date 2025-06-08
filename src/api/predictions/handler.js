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

  const { jk, bbLahir, tbLahir, umur, bb, tb } = request.payload;
  const userId = request.auth.credentials.userId;

  const user = await User.findById(userId);
  if (!user) throw new InvariantError('User tidak ditemukan');

  const mlApiUrl = process.env.ML_API_URL;
  if (!mlApiUrl) throw new ClientError('ML_API_URL belum diatur di .env', 400);

  const mlPayload = { jk, bbLahir, tbLahir, umur, bb, tb };

  let mlResult;
  try {
    const response = await axios.post(mlApiUrl, mlPayload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    mlResult = response.data;
    if (
      typeof mlResult.risikoStunting !== 'string' ||
      !Array.isArray(mlResult.tindakan) ||
      !Array.isArray(mlResult.nutrisi)
    ) {
      throw new Error('Format response ML tidak sesuai');
    }
  } catch (err) {
    console.error('Error ML API:', err.message || err);
    throw new ClientError('Gagal memproses prediksi dari ML API', 400);
  }

  const history = await new History({ userId }).save();

  const prediction = new Prediction({
    historyId: history._id,
    jk: jk.toLowerCase(), 
    bbLahir,
    tbLahir,
    umur,
    bb,
    tb,
    risikoStunting: mlResult.risikoStunting.toLowerCase(),
  });

  await prediction.save();

  return h.response({
    Error: false,
    Message: 'success',
    Result: {
      risikoStunting: prediction.risikoStunting,
      rekomendasi: mlResult.tindakan,
      nutrisi: mlResult.nutrisi,
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
    return h.response({ Error: true, Message: 'Data tidak ditemukan' }).code(404);
  }

  const prediction = await Prediction.findOne({ historyId: idPredict });
  if (!prediction) {
    return h.response({ Error: true, Message: 'Data tidak ditemukan' }).code(404);
  }

  return h.response({
    Error: false,
    Message: 'success',
    Result: {
      id: prediction._id,
      jenisKelamin: prediction.jenisKelamin,
      usia: prediction.usia,
      bbLahir: prediction.bbLahir,
      tbLahir: prediction.tbLahir,
      bb: prediction.bb,
      tb: prediction.tb,
      createdAt: prediction.createdAt,
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
