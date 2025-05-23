const { getAllFeedbackHandler, createFeedbackHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/feedback',
        handler: getAllFeedbackHandler,
    },
    {
        method: 'POST',
        path: '/feedback/{userId}',
        handler: createFeedbackHandler,
    },
];
