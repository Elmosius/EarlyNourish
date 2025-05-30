const {
    getAllUsersHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
} = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/users',
        handler: getAllUsersHandler,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: getUserByIdHandler,
    },
    {
        method: 'POST',
        path: '/users',
        handler: createUserHandler,
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: updateUserHandler,
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteUserHandler,
    },
];