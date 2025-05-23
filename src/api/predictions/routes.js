const {
    createPredictionHandler,
    getAllPredictionsHandler,
    getPredictionByIdHandler,
} = require('./handler');

module.exports = [
    {
        method: 'POST',
        path: '/prediction',
        handler: createPredictionHandler,
    },
    {
        method: 'GET',
        path: '/prediction',
        handler: getAllPredictionsHandler,
    },
    {
        method: 'GET',
        path: '/prediction/{id}',
        handler: getPredictionByIdHandler,
    },
];
