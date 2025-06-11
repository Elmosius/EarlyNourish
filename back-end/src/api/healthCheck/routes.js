const { getHealthCheckHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/healthCheck',
        handler: getHealthCheckHandler,
        options: { auth: false },
    },
];