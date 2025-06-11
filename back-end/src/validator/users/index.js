// src/validator/users/index.js
const { PostUserPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UsersValidator = {
  validatePostUserPayload: (payload) => {
    const { error } = PostUserPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

module.exports = UsersValidator;
