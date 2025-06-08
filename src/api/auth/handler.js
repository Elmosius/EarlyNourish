const authService = require('../../services/auth.service');
const AuthenticationsValidator = require('../../validator/auth');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const ClientError = require('../../exceptions/ClientError');

const loginHandlerImpl = async (request, h) => {
  AuthenticationsValidator.validateLoginPayload(request.payload);

  const { email, password } = request.payload;
  const { user, token, refreshToken } = await authService.loginUser({ email, password });

  return h.response({
    Error: false,
    Message: 'success',
    loginResult: {
      userId: user._id.toString(),
      name: user.namaLengkap,
      token,
      refreshToken,
    },
  }).code(200);
};

const loginHandler = async (request, h) => {
  try {
    return await loginHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Internal Server Error' }).code(500);
  }
};

const registerHandlerImpl = async (request, h) => {
  AuthenticationsValidator.validateRegisterPayload(request.payload);

  const { email, password, namaLengkap } = request.payload;
  await authService.registerUser({ email, password, namaLengkap });

  return h.response({ Error: false, Message: 'User created' }).code(201);
};

const registerHandler = async (request, h) => {
  try {
    return await registerHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Internal Server Error' }).code(500);
  }
};

module.exports = {
  loginHandler,
  registerHandler,
};
