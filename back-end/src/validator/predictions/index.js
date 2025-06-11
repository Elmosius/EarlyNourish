const { PostPredictionPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const PredictionsValidator = {
  validatePostPredictionPayload: (payload) => {
    const { error } = PostPredictionPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

module.exports = PredictionsValidator;