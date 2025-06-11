const Prediction = require('../models/prediction.model');

const determineStuntingRisk = (height) => {
  if (height < 70) return 'high';
  if (height < 80) return 'medium';
  return 'low';
};

const createPrediction = async (data, userId) => {
  const stuntingRisk = determineStuntingRisk(data.height);

  const prediction = new Prediction({
    userId,
    gender: data.gender,
    age: data.age,
    weight: data.weight,
    height: data.height,
    stuntingRisk,
  });

  await prediction.save();
  return prediction;
};

const getAllPredictions = async (userId) => {
  return Prediction.find({ userId });
};

const getPredictionById = async (id) => {
  return Prediction.findById(id);
};

module.exports = {
  createPrediction,
  getAllPredictions,
  getPredictionById,
};
