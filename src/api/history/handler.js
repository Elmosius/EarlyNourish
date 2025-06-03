const mongoose = require('mongoose');
const History = require('../../models/history.model');
const Prediction = require('../../models/prediction.model');
const Recommendation = require('../../models/recommendation.model');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const getHistoryByUserHandlerImpl = async (request, h) => {
  const { idUser } = request.params;
  if (!mongoose.Types.ObjectId.isValid(idUser)) {
    throw new InvariantError('User ID tidak valid');
  }

  const histories = await History.find({ userId: idUser }).sort({ createdAt: -1 });

  if (histories.length === 0) {
    return h.response({
      Error: false,
      Message: 'success',
      Result: {}, 
    }).code(200);
  }

  const result = {};
  for (const hist of histories) {
    const prediction = await Prediction.findOne({ historyId: hist._id });
    const recommendation = await Recommendation.findOne({ historyId: hist._id });

    result[hist._id] = {
      Id: hist._id,
      jenisKelamin: prediction?.jenisKelamin ?? null,
      Usia: prediction?.usia ?? null,
      bbLahir: prediction?.bbLahir ?? null,
      tbLahir: prediction?.tbLahir ?? null,
      beratBadan: prediction?.beratBadan ?? null,
      tinggiBadan: prediction?.tinggiBadan ?? null,
      stuntingRisk: prediction?.stuntingRisk ?? null,
      idRecommendation: recommendation?._id ?? null,
      Makanan: recommendation?.makanan ?? [],
      createdAt: hist.createdAt,
      updatedAt: hist.updatedAt,
    };
  }

  return h.response({
    Error: false,
    Message: 'success',
    Result: result,
  }).code(200);
};

const getHistoryByUserHandler = async (request, h) => {
  try {
    return await getHistoryByUserHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil history' }).code(500);
  }
};

module.exports = {
  getHistoryByUserHandler,
};