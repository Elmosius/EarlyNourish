const {
  getRecommendationByPredictionIdHandler,
  getRecommendationByRiskLevelHandler,
} = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/recommendation/{predID}',
    handler: getRecommendationByPredictionIdHandler, 
  },
  {
    method: 'GET',
    path: '/recommendation/risk/{riskLevel}',
    handler: getRecommendationByRiskLevelHandler, 
  },
];
