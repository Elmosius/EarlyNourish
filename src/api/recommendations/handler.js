// sudah tidak dipakai
const mongoose = require('mongoose');
const Recommendation = require('../../models/recommendation.model');
const History = require('../../models/history.model');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const getRecommendationByPredictionIdHandlerImpl = async (request, h) => {
  const { predID } = request.params;
  if (!mongoose.Types.ObjectId.isValid(predID)) {
    throw new InvariantError('ID prediksi tidak valid');
  }

  const history = await History.findById(predID);
  if (!history) {
    throw new NotFoundError('Prediksi tidak ditemukan');
  }

  const recommendation = await Recommendation.findOne({ historyId: predID });
  if (!recommendation) {
    throw new NotFoundError('Rekomendasi tidak ditemukan');
  }

  return h.response({
    Error: false,
    Message: 'success',
    recommendation,
  }).code(200);
};

const getRecommendationByPredictionIdHandler = async (request, h) => {
  try {
    return await getRecommendationByPredictionIdHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil rekomendasi nutrisi' }).code(500);
  }
};

const getRecommendationByRiskLevelHandlerImpl = async (request, h) => {
  const { riskLevel } = request.params;
  if (!['low', 'medium', 'high'].includes(riskLevel)) {
    throw new InvariantError('Risk level tidak valid');
  }

  const recommendations = await Recommendation.find({ stuntingRisk: riskLevel });
  if (!recommendations.length) {
    throw new NotFoundError('Rekomendasi tidak ditemukan');
  }

  return h.response({
    Error: false,
    Message: 'success',
    recommendation: recommendations,
  }).code(200);
};

const getRecommendationByRiskLevelHandler = async (request, h) => {
  try {
    return await getRecommendationByRiskLevelHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil rekomendasi nutrisi' }).code(500);
  }
};

module.exports = {
  getRecommendationByPredictionIdHandler,
  getRecommendationByRiskLevelHandler,
};
