const {
  PostAuthenticationLoginSchema,
  PostAuthenticationRegisterSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
  validateLoginPayload: (payload) => {
    const { error } = PostAuthenticationLoginSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
  validateRegisterPayload: (payload) => {
    const { error } = PostAuthenticationRegisterSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

module.exports = AuthenticationsValidator;
