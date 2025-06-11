const {
  createPredictionHandler,
  getPredictionByIdHandler,
} = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/prediction',
    handler: createPredictionHandler,
    options: { auth: 'jwt' },
  },
  {
    method: 'GET',
    path: '/prediction/{idUser}/{idPredict}',
    handler: getPredictionByIdHandler,
    options: { auth: 'jwt' },
  },
];