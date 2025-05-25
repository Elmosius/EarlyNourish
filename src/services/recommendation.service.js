const Recommendation = require('../models/recommendation.model');

const getRecommendationByPredictionId = async (predId) => {
  return Recommendation.findOne({ predId });
};

const getRecommendationsByRiskLevel = async (riskLevel) => {
  return Recommendation.find({ riskLevel });
};

module.exports = {
  getRecommendationByPredictionId,
  getRecommendationsByRiskLevel,
};
