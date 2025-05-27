const { checkRole } = require('../../utils/roleCheck');
const { requireRole } = require('../../middleware');

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
        options: {
        pre: [ { method: checkRole(['admin']) } ]
        }
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: getUserByIdHandler,
        options: {
        pre: [ { method: checkRole(['admin', 'user']) } ]
        }
    },
    {
        method: 'POST',
        path: '/users',
        options: {
            pre: [ { method: requireRole('admin') } ],
            handler: createUserHandler,
        },
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: updateUserHandler,
        options: {
        pre: [ { method: checkRole(['admin']) } ]
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteUserHandler,
        options: {
        pre: [ { method: checkRole(['admin']) } ]
        }
    },
];