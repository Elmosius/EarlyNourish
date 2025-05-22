const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },

    namaAnak: { type: String },
    jenisKelamin: { type: String, enum: ['male', 'female'] },
    namaOrangTua: { type: String },
    tanggalLahir: { type: Date },
    beratBadan: { type: Number },
    tinggiBadan: { type: Number },

    tokenVersion: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
