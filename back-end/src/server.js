'use strict';

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert'); 
const Path = require('path'); 

const config = require('./config');
const connectDB = require('./models');

const authPlugin = require('./api/auth');
const predictionsPlugin = require('./api/predictions');
const notificationsPlugin = require('./api/notification');
const feedbackPlugin = require('./api/feedback');
const profilePlugin = require('./api/profile');
const riwayatPlugin = require('./api/history');
const healthCheckPlugin = require('./api/healthCheck');

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

    await server.register([Jwt, Inert]);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
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

    server.route({
        method: 'GET',
        path: '/uploads/{param*}',
        options: { auth: false },
        handler: {
        directory: {
            path: Path.join(__dirname, 'uploads'),
            index: false,
            listing: false,
        },
        },
    });

    await server.register([
        authPlugin,
        predictionsPlugin,
        notificationsPlugin,
        feedbackPlugin,
        profilePlugin,
        riwayatPlugin,
        healthCheckPlugin,
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
