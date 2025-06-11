const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    nama: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
    