module.exports = {
    name: 'auth',
    version: '1.0.0',
    register: async (server) => {
        const routes = require('./routes');
        server.route(routes);
    },
};
