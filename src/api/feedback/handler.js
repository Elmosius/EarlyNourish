const Feedback = require('../../models/feedback.model');
const Joi = require('joi');
const mongoose = require('mongoose');

const feedbackSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    description: Joi.string().optional(),
});

const getAllFeedbackHandler = async (request, h) => {
    const feedbacks = await Feedback.find();
    return {
        error: false,
        message: 'success',
        feedback: feedbacks,
    };
};

const createFeedbackHandler = async (request, h) => {
    const { userId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return h.response({ error: true, message: 'User ID tidak valid' }).code(400);
    }

    const { error, value } = feedbackSchema.validate(request.payload);
    if (error) {
        return h.response({ error: true, message: error.details[0].message }).code(400);
    }

    const feedback = new Feedback({
        userId,
        rating: value.rating,
        description: value.description,
    });

    await feedback.save();

    return {
        error: false,
        message: 'success',
    };
};

module.exports = {
    getAllFeedbackHandler,
    createFeedbackHandler,
};
