const Joi = require('joi');
const { nanoid } = require('nanoid');
const authService = require('../../services/auth.service');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const registerHandler = async (request, h) => {
  try {
    const { error, value } = registerSchema.validate(request.payload);
    if (error) {
      return h
        .response({ error: true, message: error.details[0].message })
        .code(400);
    }

    const generatedUserId = `user-${nanoid(16)}`;
    await authService.registerUser({ ...value, userId: generatedUserId });

    return h
      .response({ error: false, message: 'User created' })
      .code(201);
  } catch (err) {
    console.error(err);
    return h
      .response({ error: true, message: err.message })
      .code(500);
  }
};

const loginHandler = async (request, h) => {
  try {
    const { error, value } = loginSchema.validate(request.payload);
    if (error) {
      return h
        .response({ error: true, message: error.details[0].message })
        .code(400);
    }

    const { user, token } = await authService.loginUser(value);

    return h
      .response({
        error: false,
        message: 'success',
        loginResult: {
          userId: user.userId,
          name: user.fullName,
          token,
        },
      })
      .code(200);
  } catch (err) {
    console.error(err);
    return h
      .response({ error: true, message: err.message })
      .code(500);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
