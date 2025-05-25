const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const getAllUsers = async () => {
  return User.find().populate('roleId', 'name');
};

const getUserById = async (id) => {
  return User.findById(id).populate('roleId', 'name');
};

const createUser = async (userData) => {
  const exists = await User.findOne({ email: userData.email });
  if (exists) throw new Error('Email sudah terdaftar');

  const role = await Role.findOne({ name: userData.role });
  if (!role) throw new Error('Role tidak ditemukan');

  if (!userData.password) throw new Error('Password harus diisi');
  const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);

  const newUser = new User({
    email: userData.email,
    passwordHash,
    fullName: userData.fullName,
    roleId: role._id,
    namaAnak: userData.namaAnak,
    jenisKelamin: userData.jenisKelamin,
    namaOrangTua: userData.namaOrangTua,
    tanggalLahir: userData.tanggalLahir,
    beratBadan: userData.beratBadan,
    tinggiBadan: userData.tinggiBadan,
  });

  await newUser.save();
  return newUser;
};

const updateUser = async (id, updateData) => {
  const userWithEmail = await User.findOne({ email: updateData.email });
  if (userWithEmail && userWithEmail._id.toString() !== id) {
    throw new Error('Email sudah terdaftar');
  }

  const user = await User.findById(id);
  if (!user) return null;

  const role = await Role.findOne({ name: updateData.role });
  if (!role) throw new Error('Role tidak ditemukan');

  let passwordHash = user.passwordHash;
  if (updateData.password) {
    passwordHash = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }

  user.email = updateData.email;
  user.passwordHash = passwordHash;
  user.fullName = updateData.fullName;
  user.roleId = role._id;
  user.namaAnak = updateData.namaAnak;
  user.jenisKelamin = updateData.jenisKelamin;
  user.namaOrangTua = updateData.namaOrangTua;
  user.tanggalLahir = updateData.tanggalLahir;
  user.beratBadan = updateData.beratBadan;
  user.tinggiBadan = updateData.tinggiBadan;

  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
