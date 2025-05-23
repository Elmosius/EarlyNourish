const {
    getRecommendationByPredictionHandler,
    getRecommendationsByRiskHandler,
} = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recommendation/{predId}',
        handler: getRecommendationByPredictionHandler,
    },
    {
        method: 'GET',
        path: '/recommendation/risk/{riskLevel}',
        handler: getRecommendationsByRiskHandler,
    },
];
