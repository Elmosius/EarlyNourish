const Joi = require('joi');
const mongoose = require('mongoose');
const userService = require('../../services/user.service');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).optional(),
  role: Joi.string().required(),
  fullName: Joi.string().required(),
  namaAnak: Joi.string().optional().allow(''),
  jenisKelamin: Joi.string().valid('male', 'female').optional(),
  namaOrangTua: Joi.string().optional().allow(''),
  tanggalLahir: Joi.date().optional(),
  beratBadan: Joi.number().optional(),
  tinggiBadan: Joi.number().optional(),
});

const getAllUsersHandler = async (request, h) => {
  const userRole = request.auth.credentials.role;

  if (userRole !== 'admin' && userRole !== 'user') {
    return h.response({ error: true, message: 'Akses ditolak' }).code(403);
  }

  try {
    const users = await userService.getAllUsers();
    return { error: false, message: 'success', users };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil data user' }).code(500);
  }
};

const getUserByIdHandler = async (request, h) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return h.response({ error: true, message: 'ID tidak valid' }).code(400);
  }
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }
    return { error: false, message: 'success', user };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil user' }).code(500);
  }
};

const createUserHandler = async (request, h) => {
  const userRole = request.auth.credentials.role;
  if (userRole !== 'admin') {
    return h.response({ error: true, message: 'Akses ditolak: hanya admin yang dapat membuat user' }).code(403);
  }

  const { error, value } = userSchema.validate(request.payload);
  if (error) {
    return h.response({ error: true, message: error.details[0].message }).code(400);
  }
  try {
    const user = await userService.createUser(value);
    return h.response({ error: false, message: 'User berhasil dibuat', user }).code(201);
  } catch (err) {
    console.error(err);
    if (err.message.includes('Email sudah terdaftar')) {
      return h.response({ error: true, message: err.message }).code(400);
    }
    return h.response({ error: true, message: 'Gagal membuat user' }).code(500);
  }
};

const updateUserHandler = async (request, h) => {
  const userRole = request.auth.credentials.role;
  if (userRole !== 'admin') {
    return h.response({ error: true, message: 'Akses ditolak: hanya admin yang dapat memperbarui user' }).code(403);
  }

  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return h.response({ error: true, message: 'ID tidak valid' }).code(400);
  }
  const { error, value } = userSchema.validate(request.payload);
  if (error) {
    return h.response({ error: true, message: error.details[0].message }).code(400);
  }
  try {
    const updatedUser = await userService.updateUser(id, value);
    if (!updatedUser) {
      return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }
    return { error: false, message: 'User berhasil diperbarui', user: updatedUser };
  } catch (err) {
    console.error(err);
    if (err.message.includes('Email sudah terdaftar')) {
      return h.response({ error: true, message: err.message }).code(400);
    }
    return h.response({ error: true, message: 'Gagal memperbarui user' }).code(500);
  }
};

const deleteUserHandler = async (request, h) => {
  const userRole = request.auth.credentials.role;
  if (userRole !== 'admin') {
    return h.response({ error: true, message: 'Akses ditolak: hanya admin yang dapat menghapus user' }).code(403);
  }

  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return h.response({ error: true, message: 'ID tidak valid' }).code(400);
  }
  try {
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }
    return { error: false, message: 'User berhasil dihapus' };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal menghapus user' }).code(500);
  }
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
