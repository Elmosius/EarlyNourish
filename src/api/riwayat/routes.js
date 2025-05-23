const { getHistoryHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/riwayat/{userId}',
        handler: getHistoryHandler,
    },
];
