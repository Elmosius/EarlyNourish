'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const config = require('./config');
const connectDB = require('./models');
const authPlugin = require('./api/auth');
const usersPlugin = require('./api/users');
const predictionsPlugin = require('./api/predictions');
const recommendationsPlugin = require('./api/recommendations');
const notificationsPlugin = require('./api/notifications');
const feedbackPlugin = require('./api/feedback');


const init = async () => {
    await connectDB();

    const server = Hapi.server({
        port: config.port,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
        cors: {
            origin: ['*'],
        },
        },
    });

    await server.register(Jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: config.jwtSecret,
        verify: {
        aud: false,
        iss: false,
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 14400,
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {
                userId: artifacts.decoded.payload.userId,
                email: artifacts.decoded.payload.email,
                role: artifacts.decoded.payload.role,
                fullName: artifacts.decoded.payload.fullName,
                },
            };
        },
    });

    server.auth.default('jwt');

    await server.register([
        authPlugin,
        usersPlugin,
        predictionsPlugin,
        recommendationsPlugin,
        notificationsPlugin,
        feedbackPlugin,
        ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
