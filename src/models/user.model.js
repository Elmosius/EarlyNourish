const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        photoProfile: { type: String, default: null },    
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        fullName: { type: String, required: true },
        roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
        alamat: { type: String, default: null },
        namaAnak: { type: String, default: '' },
        jenisKelamin: { type: String, enum: ['male', 'female'], default: null },
        namaOrangTua: { type: String, default: '' },
        tanggalLahir: { type: Date, default: null },
        beratBadan: { type: Number, default: null },
        tinggiBadan: { type: Number, default: null },
        tokenVersion: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
