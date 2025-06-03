const { getProfileHandler, updateProfileHandler } = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/profile/{userId}',
        handler: getProfileHandler,
        options: { auth: 'jwt' },
    },
    {
        method: 'PUT',
        path: '/profile/{userId}',
        handler: updateProfileHandler,
        options: { auth: 'jwt' },
    },
];