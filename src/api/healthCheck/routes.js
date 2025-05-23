const { healthCheckHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/healthCheck',
        handler: healthCheckHandler,
        options: { auth: false },
    },
];
