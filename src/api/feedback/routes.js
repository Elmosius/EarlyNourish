const { getAllFeedbackHandler, createFeedbackHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/feedback',
        handler: getAllFeedbackHandler,
        options: { auth: 'jwt' },
    },
    {
        method: 'POST',
        path: '/feedback/{userId}',
        handler: createFeedbackHandler,
        options: { auth: 'jwt' },
    },
];