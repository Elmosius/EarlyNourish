const Joi = require('joi');
const mongoose = require('mongoose');
const predictionService = require('../../services/prediction.service');

const predictionSchema = Joi.object({
  gender: Joi.string().valid('male', 'female').required(),
  age: Joi.number().integer().min(0).required(),
  weight: Joi.number().min(0).required(),
  height: Joi.number().min(0).required(),
  stuntingRisk: Joi.string().valid('low', 'medium', 'high').optional(),
});

const createPredictionHandler = async (request, h) => {
  const { error, value } = predictionSchema.validate(request.payload);
  if (error) {
    return h.response({ error: true, message: error.details[0].message }).code(400);
  }
  try {
    const prediction = await predictionService.createPrediction(value, request.auth.credentials.userId);
    return h.response({
      error: false,
      message: 'success',
      result: prediction,
    }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal menyimpan prediksi' }).code(500);
  }
};

const getAllPredictionsHandler = async (request, h) => {
  try {
    const predictions = await predictionService.getAllPredictions(request.auth.credentials.userId);
    return {
      error: false,
      message: 'success',
      result: predictions,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil prediksi' }).code(500);
  }
};

const getPredictionByIdHandler = async (request, h) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return h.response({ error: true, message: 'ID tidak valid' }).code(400);
  }
  try {
    const prediction = await predictionService.getPredictionById(id);
    if (!prediction) {
      return h.response({ error: true, message: 'Data prediksi tidak ditemukan' }).code(404);
    }
    return {
      error: false,
      message: 'success',
      result: prediction,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil data prediksi' }).code(500);
  }
};

module.exports = {
  createPredictionHandler,
  getAllPredictionsHandler,
  getPredictionByIdHandler,
};
