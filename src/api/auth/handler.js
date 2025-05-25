const Joi = require('joi');
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
      return h.response({ error: true, message: error.details[0].message }).code(400);
    }

    await authService.registerUser(value);

    return h.response({ error: false, message: 'User berhasil dibuat' }).code(201);
  } catch (err) {
    if (err.message.includes('Email sudah digunakan')) {
      return h.response({ error: true, message: err.message }).code(400);
    }
    console.error(err);
    return h.response({ error: true, message: 'Terjadi kesalahan server' }).code(500);
  }
};

const loginHandler = async (request, h) => {
  try {
    const { error, value } = loginSchema.validate(request.payload);
    if (error) {
      return h.response({ error: true, message: error.details[0].message }).code(400);
    }

    const { user, token } = await authService.loginUser(value);

    return {
      error: false,
      message: 'success',
      loginResult: {
        userId: user._id.toString(),
        name: user.fullName,
        token,
      },
    };
  } catch (err) {
    if (
      err.message === 'Email tidak ditemukan' ||
      err.message === 'Password salah'
    ) {
      return h.response({ error: true, message: err.message }).code(401);
    }
    console.error(err);
    return h.response({ error: true, message: 'Terjadi kesalahan server' }).code(500);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
