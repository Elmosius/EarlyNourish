const Recommendation = require('../../models/recommendation.model');
const mongoose = require('mongoose');

const getRecommendationByPredictionHandler = async (request, h) => {
    const { predId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(predId)) {
        return h.response({ error: true, message: 'ID prediksi tidak valid' }).code(400);
    }

    const recommendation = await Recommendation.findOne({ predId });
    if (!recommendation) {
        return h.response({ error: true, message: 'Rekomendasi tidak ditemukan' }).code(404);
    }

    return {
        error: false,
        message: 'success',
        recommendation,
    };
};

const getRecommendationsByRiskHandler = async (request, h) => {
    const { riskLevel } = request.params;
    const validRisks = ['low', 'medium', 'high'];
    if (!validRisks.includes(riskLevel)) {
        return h.response({ error: true, message: 'Risk level tidak valid' }).code(400);
    }

    const recommendations = await Recommendation.find({ riskLevel });
    return {
        error: false,
        message: 'success',
        recommendations,
    };
};

module.exports = {
    getRecommendationByPredictionHandler,
    getRecommendationsByRiskHandler,
};
