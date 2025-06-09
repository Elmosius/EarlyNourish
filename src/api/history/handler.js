const mongoose = require('mongoose');
const History = require('../../models/history.model');
const Prediction = require('../../models/prediction.model');
const Recommendation = require('../../models/recommendation.model');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const getHistoryByUserHandlerImpl = async (request, h) => {
  const { idUser } = request.params;
  if (!mongoose.Types.ObjectId.isValid(idUser)) throw new InvariantError('User ID tidak valid');

  const histories = await History.find({ userId: idUser }).sort({ createdAt: -1 });
  const result = await Promise.all(histories.map(async (hist) => {
    const prediction = await Prediction.findOne({ historyId: hist._id });
    const recommendation = await Recommendation.findOne({ historyId: hist._id });

    return {
      historyId: hist._id,
      predictionId: prediction?._id ?? null,
      recommendationId: recommendation?._id ?? null,
      jenisKelamin: prediction?.jk ?? null,
      usia: prediction?.umur ?? null,
      bbLahir: prediction?.bbLahir ?? null,
      tbLahir: prediction?.tbLahir ?? null,
      bb: prediction?.bb ?? null,
      tb: prediction?.tb ?? null,
      nutrisi: recommendation?.nutrisi ?? [],
      tindakan: recommendation?.tindakan ?? [],
      createdAt: prediction?.createdAt ?? hist.createdAt,
    };
  }));

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