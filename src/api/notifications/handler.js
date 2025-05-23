const Notification = require('../../models/notification.model');
const mongoose = require('mongoose');
const Joi = require('joi');

const notificationSchema = Joi.object({
    type: Joi.string().required(),
    message: Joi.string().required(),
});

const getAllNotificationsHandler = async (request, h) => {
    const notifications = await Notification.find({ userId: request.auth.credentials.userId });
    return {
        error: false,
        message: 'success',
        notifications,
    };
};

const createNotificationHandler = async (request, h) => {
    const { error, value } = notificationSchema.validate(request.payload);
    if (error) {
        return h.response({ error: true, message: error.details[0].message }).code(400);
    }

    const notification = new Notification({
        userId: request.auth.credentials.userId,
        type: value.type,
        message: value.message,
        read: false,
    });

    await notification.save();

    return h.response({
        error: false,
        message: 'Notification sent',
        notificationId: notification._id.toString(),
    }).code(201);
};

const markNotificationReadHandler = async (request, h) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return h.response({ error: true, message: 'ID tidak valid' }).code(400);
    }

    const notification = await Notification.findById(id);
    if (!notification) {
        return h.response({ error: true, message: 'Notification tidak ditemukan' }).code(404);
    }

    notification.read = true;
    await notification.save();

    return {
        error: false,
        message: 'Notification marked as read',
    };
};

module.exports = {
    getAllNotificationsHandler,
    createNotificationHandler,
    markNotificationReadHandler,
};
