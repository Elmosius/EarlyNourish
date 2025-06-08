const { loginHandler, registerHandler } = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
    options: { auth: false },
  },
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
    options: { auth: false },
  },
];
