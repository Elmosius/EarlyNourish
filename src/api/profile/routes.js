const { getProfileHandler, updateProfileHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/profile/{userId}',
        handler: getProfileHandler,
    },
    {
        method: 'PUT',
        path: '/profile/{userId}',
        handler: updateProfileHandler,
    },
];
