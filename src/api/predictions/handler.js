const Prediction = require('../../models/prediction.model');
const Joi = require('joi');
const mongoose = require('mongoose');

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

    let stuntingRisk = 'low';
    if (value.height < 70) stuntingRisk = 'high';
    else if (value.height < 80) stuntingRisk = 'medium';

    const prediction = new Prediction({
        userId: request.auth.credentials.userId,
        gender: value.gender,
        age: value.age,
        weight: value.weight,
        height: value.height,
        stuntingRisk,
    });

    await prediction.save();

    return h.response({
        error: false,
        message: 'success',
        result: prediction,
    }).code(201);
};

const getAllPredictionsHandler = async (request, h) => {
    const predictions = await Prediction.find({ userId: request.auth.credentials.userId });
    return {
        error: false,
        message: 'success',
        result: predictions,
    };
};

const getPredictionByIdHandler = async (request, h) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return h.response({ error: true, message: 'ID tidak valid' }).code(400);
    }
    const prediction = await Prediction.findById(id);
    if (!prediction) {
        return h.response({ error: true, message: 'Data prediksi tidak ditemukan' }).code(404);
    }
    return {
        error: false,
        message: 'success',
        result: prediction,
    };
};

module.exports = {
    createPredictionHandler,
    getAllPredictionsHandler,
    getPredictionByIdHandler,
};
