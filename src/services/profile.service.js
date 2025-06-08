const User = require('../models/user.model');

const getUserById = async (userId) => {
  return User.findById(userId)
    .select('-passwordHash -__v')
    .populate('roleId', 'nama');
};

const updateUserProfile = async (userId, profileData) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      ...(profileData.namaLengkap && { namaLengkap: profileData.namaLengkap }),
      ...(profileData.namaAnak && { namaAnak: profileData.namaAnak }),
      ...(profileData.jenisKelamin && { jenisKelamin: profileData.jenisKelamin }),
      ...(profileData.namaOrangTua && { namaOrangTua: profileData.namaOrangTua }),
      ...(profileData.tanggalLahir && { tanggalLahir: profileData.tanggalLahir }),
      ...(profileData.beratBadan !== undefined && { beratBadan: profileData.beratBadan }),
      ...(profileData.tinggiBadan !== undefined && { tinggiBadan: profileData.tinggiBadan }),
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  getUserById,
  updateUserProfile,
};
