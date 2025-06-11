const jwt = require('jsonwebtoken');

class TokenManager {
    static generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        algorithm: 'HS256',
        expiresIn: '15m',
        });
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        algorithm: 'HS256',
        expiresIn: '7d',
        });
    }

    static verifyRefreshToken(token) {
        try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
        } catch (err) {
        throw new Error('Invalid refresh token');
        }
    }
}

module.exports = TokenManager;
