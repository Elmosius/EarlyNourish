const { getHistoryByUserHandler } = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/history/{idUser}',
    handler: getHistoryByUserHandler,
    options: {
      auth: 'jwt',
    },
  },
];