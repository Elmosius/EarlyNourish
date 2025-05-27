const checkRole = (allowedRoles) => {
    return (request, h) => {
        const userRole = request.auth.credentials.role;
        if (!allowedRoles.includes(userRole)) {
        return h.response({
            error: true,
            message: 'Akses ditolak: Anda tidak memiliki izin yang cukup',
        }).code(403).takeover();
        }
        return h.continue;
    };
};

module.exports = {
    checkRole,
};