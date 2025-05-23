const {
  getAllNotificationsHandler,
  createNotificationHandler,
  markNotificationReadHandler,
} = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/notification',
        handler: getAllNotificationsHandler,
    },
    {
        method: 'POST',
        path: '/notification',
        handler: createNotificationHandler,
    },
    {
        method: 'PUT',
        path: '/notification/{id}/read',
        handler: markNotificationReadHandler,
    },
];
