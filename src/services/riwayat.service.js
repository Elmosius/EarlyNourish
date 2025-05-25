const Prediction = require('../models/prediction.model');
const Recommendation = require('../models/recommendation.model');

const getUserHistory = async (userId) => {
  const predictions = await Prediction.find({ userId });

  const history = await Promise.all(
    predictions.map(async (pred) => {
      const recommendation = await Recommendation.findOne({ predId: pred._id });
      return {
        prediction: pred,
        recommendation: recommendation || null,
      };
    })
  );

  return history;
};

module.exports = {
  getUserHistory,
};
