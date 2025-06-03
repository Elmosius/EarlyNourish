const { PostSubscribeSchema, DeleteSubscribeSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const NotificationsValidator = {
  validateSubscribePayload: (payload) => {
    const { error } = PostSubscribeSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
  validateUnsubscribePayload: (payload) => {
    const { error } = DeleteSubscribeSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

module.exports = NotificationsValidator;