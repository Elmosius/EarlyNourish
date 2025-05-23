const Prediction = require('../../models/prediction.model');
const Recommendation = require('../../models/recommendation.model');
const mongoose = require('mongoose');

const getHistoryHandler = async (request, h) => {
    const { userId } = request.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return h.response({ error: true, message: 'User ID tidak valid' }).code(400);
    }

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

    return {
        error: false,
        message: 'success',
        history,
    };
};

module.exports = {
    getHistoryHandler,
};
