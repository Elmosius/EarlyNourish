const { PostFeedbackPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const FeedbackValidator = {
  validatePostFeedbackPayload: (payload) => {
    const { error } = PostFeedbackPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

module.exports = FeedbackValidator;