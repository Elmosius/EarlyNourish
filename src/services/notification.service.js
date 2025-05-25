const Notification = require('../models/notification.model');

const getNotificationsByUserId = async (userId) => {
  return Notification.find({ userId });
};

const createNotification = async ({ userId, type, message }) => {
  const notification = new Notification({
    userId,
    type,
    message,
    read: false,
  });
  await notification.save();
  return notification._id.toString();
};

const markNotificationRead = async (id) => {
  const notification = await Notification.findById(id);
  if (!notification) return null;
  notification.read = true;
  await notification.save();
  return true;
};

module.exports = {
  getNotificationsByUserId,
  createNotification,
  markNotificationRead,
};
