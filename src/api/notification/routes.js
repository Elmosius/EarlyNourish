const {
  subscribeNotificationHandler,
  unsubscribeNotificationHandler,
} = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/notifications/subscribe',
    handler: subscribeNotificationHandler,
    options: { auth: 'jwt' },
  },
  {
    method: 'DELETE',
    path: '/notifications/subscribe',
    handler: unsubscribeNotificationHandler,
    options: { auth: 'jwt' },
  },
];