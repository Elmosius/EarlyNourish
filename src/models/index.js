const mongoose = require('mongoose');
const Role = require('./role.model'); 

const { mongodbUri } = require('../config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        const userRole = await Role.findOne({ name: 'user' });
        if (!userRole) {
            console.log('Role "user" tidak ditemukan, membuat role baru...');
            const newRole = new Role({ name: 'user' });
            await newRole.save();
            console.log('Role "user" berhasil dibuat');
        }

    } catch (error) {
        console.error('Failed to connect MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
