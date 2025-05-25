const Joi = require('joi');
const mongoose = require('mongoose');
const notificationService = require('../../services/notification.service');

const notificationSchema = Joi.object({
  type: Joi.string().required(),
  message: Joi.string().required(),
});

const getAllNotificationsHandler = async (request, h) => {
  try {
    const notifications = await notificationService.getNotificationsByUserId(request.auth.credentials.userId);
    return {
      error: false,
      message: 'success',
      notifications,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil notifikasi' }).code(500);
  }
};

const createNotificationHandler = async (request, h) => {
  const { error, value } = notificationSchema.validate(request.payload);
  if (error) {
    return h.response({ error: true, message: error.details[0].message }).code(400);
  }
  try {
    const notificationId = await notificationService.createNotification({
      userId: request.auth.credentials.userId,
      type: value.type,
      message: value.message,
    });
    return h.response({
      error: false,
      message: 'Notification sent',
      notificationId,
    }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal membuat notifikasi' }).code(500);
  }
};

const markNotificationReadHandler = async (request, h) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return h.response({ error: true, message: 'ID tidak valid' }).code(400);
  }
  try {
    const updated = await notificationService.markNotificationRead(id);
    if (!updated) {
      return h.response({ error: true, message: 'Notification tidak ditemukan' }).code(404);
    }
    return {
      error: false,
      message: 'Notification marked as read',
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal memperbarui notifikasi' }).code(500);
  }
};

module.exports = {
  getAllNotificationsHandler,
  createNotificationHandler,
  markNotificationReadHandler,
};
