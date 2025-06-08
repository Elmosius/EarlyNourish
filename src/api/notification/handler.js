const NotificationsValidator = require('../../validator/notifications');
const InvariantError = require('../../exceptions/InvariantError');
const ClientError = require('../../exceptions/ClientError');

const subscribeNotificationHandlerImpl = async (request, h) => {
  NotificationsValidator.validateSubscribePayload(request.payload);

  const { endpoint, keys } = request.payload;
  const userId = request.auth.credentials.userId;

  const now = new Date().toISOString();
  const data = {
    endpoint,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
    userId,
    createdAt: now,
  };

  return h.response({
    Error: false,
    Message: 'Success to subscribe web push notification.',
  }).code(201);
};

const subscribeNotificationHandler = async (request, h) => {
  try {
    return await subscribeNotificationHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ error: true, message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ error: true, message: 'Gagal subscribe notifikasi' }).code(500);
  }
};

const unsubscribeNotificationHandlerImpl = async (request, h) => {
  const { endpoint } = request.payload;
  const userId = request.auth.credentials.userId;

  if (!endpoint) {
    throw new InvariantError('Payload harus berisi endpoint');
  }

  return h.response({
    Error: false,
    Message: 'Success to unsubscribe web push notification.',
  }).code(200);
};

const unsubscribeNotificationHandler = async (request, h) => {
  try {
    return await unsubscribeNotificationHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ error: true, message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ error: true, message: 'Gagal unsubscribe notifikasi' }).code(500);
  }
};

module.exports = {
  subscribeNotificationHandler,
  unsubscribeNotificationHandler,
};