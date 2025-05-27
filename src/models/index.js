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

        let userRole = await Role.findOne({ name: 'user' });
        if (!userRole) {
            console.log('Role "user" tidak ditemukan, membuat role baru...');
            userRole = new Role({ name: 'user' });
            await userRole.save();
            console.log('Role "user" berhasil dibuat');
        } else {
            console.log('Role "user" sudah ada');
        }

        let adminRole = await Role.findOne({ name: 'admin' });
        if (!adminRole) {
            console.log('Role "admin" tidak ditemukan, membuat role baru...');
            adminRole = new Role({ name: 'admin' });
            await adminRole.save();
            console.log('Role "admin" berhasil dibuat');
        } else {
            console.log('Role "admin" sudah ada');
        }

    } catch (error) {
        console.error('Failed to connect MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
