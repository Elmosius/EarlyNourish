const User = require('../models/user.model');

const getUserById = async (userId) => {
  return User.findById(userId).populate('roleId', 'name');
};

const updateUserProfile = async (userId, profileData) => {
  const user = await User.findById(userId);
  if (!user) return null;

  user.email = profileData.email;
  user.fullName = profileData.fullName;
  user.namaAnak = profileData.namaAnak;
  user.jenisKelamin = profileData.jenisKelamin;
  user.namaOrangTua = profileData.namaOrangTua;
  user.tanggalLahir = profileData.tanggalLahir;
  user.beratBadan = profileData.beratBadan;
  user.tinggiBadan = profileData.tinggiBadan;

  await user.save();
  return user;
};

module.exports = {
  getUserById,
  updateUserProfile,
};
