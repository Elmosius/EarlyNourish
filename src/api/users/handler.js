// sudah tidak dipakai
const mongoose = require('mongoose');
const User = require('../../models/user.model');
const userService = require('../../services/user.service');
const UsersValidator = require('../../validator/users');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const getAllUsersHandlerImpl = async (request, h) => {
  const users = await User.find()
    .select('-passwordHash -__v')
    .populate('roleId', '_id name')
    .lean();

  const usersWithDefaults = users.map((user) => ({
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    roleId: user.roleId,
    alamat: user.alamat != null ? user.alamat : null,
    namaAnak: user.namaAnak != null ? user.namaAnak : '',
    jenisKelamin: user.jenisKelamin != null ? user.jenisKelamin : null,
    namaOrangTua: user.namaOrangTua != null ? user.namaOrangTua : '',
    tanggalLahir: user.tanggalLahir != null ? user.tanggalLahir : null,
    beratBadan: user.beratBadan != null ? user.beratBadan : null,
    tinggiBadan: user.tinggiBadan != null ? user.tinggiBadan : null,
    tokenVersion: user.tokenVersion,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  return h
    .response({
      Error: false,
      Message: 'success',
      users: usersWithDefaults,
    })
    .code(200);
};

const getAllUsersHandler = async (request, h) => {
  try {
    return await getAllUsersHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil data user' }).code(500);
  }
};

const getUserByIdHandlerImpl = async (request, h) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvariantError('ID tidak valid');
  }

  const user = await User.findById(id)
    .select('-passwordHash -__v')
    .populate('roleId', '_id name')
    .lean();

  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }

  const userWithDefaults = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    roleId: user.roleId,
    alamat: user.alamat != null ? user.alamat : null,
    namaAnak: user.namaAnak != null ? user.namaAnak : '',
    jenisKelamin: user.jenisKelamin != null ? user.jenisKelamin : null,
    namaOrangTua: user.namaOrangTua != null ? user.namaOrangTua : '',
    tanggalLahir: user.tanggalLahir != null ? user.tanggalLahir : null,
    beratBadan: user.beratBadan != null ? user.beratBadan : null,
    tinggiBadan: user.tinggiBadan != null ? user.tinggiBadan : null,
    tokenVersion: user.tokenVersion,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return h
    .response({
      Error: false,
      Message: 'success',
      users: userWithDefaults,
    })
    .code(200);
};

const getUserByIdHandler = async (request, h) => {
  try {
    return await getUserByIdHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil user' }).code(500);
  }
};

const createUserHandlerImpl = async (request, h) => {
  UsersValidator.validatePostUserPayload(request.payload);

  const {
    email,
    password,
    role,
    fullName,
    namaAnak,
    jenisKelamin,
    namaOrangTua,
    tanggalLahir,
    beratBadan,
    tinggiBadan,
  } = request.payload;

  const user = await userService.createUser({
    email,
    password,
    role,
    fullName,
    namaAnak,
    jenisKelamin,
    namaOrangTua,
    tanggalLahir,
    beratBadan,
    tinggiBadan,
  });

  const created = await User.findById(user._id)
    .select('-passwordHash -__v')
    .populate('roleId', '_id name')
    .lean();

  const responseUser = {
    _id: created._id,
    email: created.email,
    fullName: created.fullName,
    roleId: created.roleId,
    alamat: created.alamat != null ? created.alamat : null,
    namaAnak: created.namaAnak != null ? created.namaAnak : '',
    jenisKelamin: created.jenisKelamin != null ? created.jenisKelamin : null,
    namaOrangTua: created.namaOrangTua != null ? created.namaOrangTua : '',
    tanggalLahir: created.tanggalLahir != null ? created.tanggalLahir : null,
    beratBadan: created.beratBadan != null ? created.beratBadan : null,
    tinggiBadan: created.tinggiBadan != null ? created.tinggiBadan : null,
    tokenVersion: created.tokenVersion,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  };

  return h
    .response({
      Error: false,
      Message: 'User successfully created',
      user: responseUser,
    })
    .code(201);
};

const createUserHandler = async (request, h) => {
  try {
    return await createUserHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    if (err.message.includes('Email sudah terdaftar')) {
      return h.response({ Error: true, Message: err.message }).code(400);
    }
    return h.response({ Error: true, Message: 'Gagal membuat user' }).code(500);
  }
};

const updateUserHandlerImpl = async (request, h) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvariantError('ID tidak valid');
  }

  UsersValidator.validatePostUserPayload(request.payload);

  const {
    email,
    password,
    role,
    fullName,
    namaAnak,
    jenisKelamin,
    namaOrangTua,
    tanggalLahir,
    beratBadan,
    tinggiBadan,
  } = request.payload;

  const updated = await userService.updateUser(id, {
    email,
    password,
    role,
    fullName,
    namaAnak,
    jenisKelamin,
    namaOrangTua,
    tanggalLahir,
    beratBadan,
    tinggiBadan,
  });
  if (!updated) {
    throw new NotFoundError('User tidak ditemukan');
  }

  const populated = await User.findById(id)
    .select('-passwordHash -__v')
    .populate('roleId', '_id name')
    .lean();

  const responseUser = {
    _id: populated._id,
    email: populated.email,
    fullName: populated.fullName,
    roleId: populated.roleId,
    alamat: populated.alamat != null ? populated.alamat : null,
    namaAnak: populated.namaAnak != null ? populated.namaAnak : '',
    jenisKelamin: populated.jenisKelamin != null ? populated.jenisKelamin : null,
    namaOrangTua: populated.namaOrangTua != null ? populated.namaOrangTua : '',
    tanggalLahir: populated.tanggalLahir != null ? populated.tanggalLahir : null,
    beratBadan: populated.beratBadan != null ? populated.beratBadan : null,
    tinggiBadan: populated.tinggiBadan != null ? populated.tinggiBadan : null,
    tokenVersion: populated.tokenVersion,
    createdAt: populated.createdAt,
    updatedAt: populated.updatedAt,
  };

  return h
    .response({
      Error: false,
      Message: 'User successfully created',
      user: responseUser,
    })
    .code(200);
};

const updateUserHandler = async (request, h) => {
  try {
    return await updateUserHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    if (err.message.includes('Email sudah terdaftar')) {
      return h.response({ Error: true, Message: err.message }).code(400);
    }
    return h.response({ Error: true, Message: 'Gagal memperbarui user' }).code(500);
  }
};

const deleteUserHandlerImpl = async (request, h) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvariantError('ID tidak valid');
  }
  const deleted = await userService.deleteUser(id);
  if (!deleted) {
    throw new NotFoundError('User tidak ditemukan');
  }
  return h
    .response({
      Error: false,
      Message: 'User successfully deleted',
    })
    .code(200);
};

const deleteUserHandler = async (request, h) => {
  try {
    return await deleteUserHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal menghapus user' }).code(500);
  }
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
