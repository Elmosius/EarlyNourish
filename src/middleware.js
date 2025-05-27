const Boom = require('@hapi/boom');

const requireRole = (requiredRole) => {
    return (request, h) => {
        const { role } = request.auth.credentials;

        if (role !== requiredRole) {
        throw Boom.forbidden(`Access denied. Requires role: ${requiredRole}`);
        }

        return h.continue;
    };
};

module.exports = {
    requireRole,
};
