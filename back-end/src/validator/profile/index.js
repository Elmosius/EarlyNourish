const { PutProfilePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ProfileValidator = {
  validatePutProfilePayload: (payload) => {
    const { error } = PutProfilePayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

module.exports = ProfileValidator;