const {
  getAllFeedbackHandler,
  getFeedbackByUserHandler,
  createFeedbackHandler,
} = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/feedback',
    handler: getAllFeedbackHandler,
    options: { auth: false },
  },
  {
    method: 'GET',
    path: '/feedback/{userId}',
    handler: getFeedbackByUserHandler,
    options: { auth: 'jwt' },
  },
  {
    method: 'POST',
    path: '/feedback/{userId}',
    handler: createFeedbackHandler,
    options: { auth: 'jwt' },
  },
];
