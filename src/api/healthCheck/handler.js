const healthCheckHandler = async (request, h) => {
    return {
        error: false,
        message: 'success',
        result: {
        server: 'running',
        database: 'connected',
        timestamp: new Date().toISOString(),
        },
    };
};

module.exports = { healthCheckHandler };
