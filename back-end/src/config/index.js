require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
};
