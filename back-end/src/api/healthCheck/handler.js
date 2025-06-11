const getHealthCheckHandler = async (request, h) => {
  const result = {
    database: 'connected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  return h
    .response({
      Error: false,
      Message: 'success',
      result,
    })
    .code(200);
};

module.exports = {
  getHealthCheckHandler,
};