const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  namaLengkap: { type: String, required: true }, 
  fotoProfil: { type: String, default: null }, 
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  alamat: { type: String, default: null },
  namaAnak: { type: String, default: '' },
  jenisKelamin: { type: String, enum: ['p', 'l'], default: null },
  tanggalLahir: { type: Date, default: null },
  bbLahir: { type: Number, default: null },
  tbLahir: { type: Number, default: null },
  tokenVersion: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
