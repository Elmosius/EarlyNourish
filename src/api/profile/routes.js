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
        options: { 
            auth: 'jwt',
            payload: {
            output: 'stream',
            parse: true,
            multipart: true,
            maxBytes: 1048576 * 5,
            allow: 'multipart/form-data',
            },
        },
    }
];