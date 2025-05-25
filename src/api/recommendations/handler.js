const mongoose = require('mongoose');
const recommendationService = require('../../services/recommendation.service');

const getRecommendationByPredictionHandler = async (request, h) => {
  const { predId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(predId)) {
    return h.response({ error: true, message: 'ID prediksi tidak valid' }).code(400);
  }
  try {
    const recommendation = await recommendationService.getRecommendationByPredictionId(predId);
    if (!recommendation) {
      return h.response({ error: true, message: 'Rekomendasi tidak ditemukan' }).code(404);
    }
    return {
      error: false,
      message: 'success',
      recommendation,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil rekomendasi' }).code(500);
  }
};

const getRecommendationsByRiskHandler = async (request, h) => {
  const { riskLevel } = request.params;
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(riskLevel)) {
    return h.response({ error: true, message: 'Risk level tidak valid' }).code(400);
  }
  try {
    const recommendations = await recommendationService.getRecommendationsByRiskLevel(riskLevel);
    return {
      error: false,
      message: 'success',
      recommendations,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil rekomendasi' }).code(500);
  }
};

module.exports = {
  getRecommendationByPredictionHandler,
  getRecommendationsByRiskHandler,
};
