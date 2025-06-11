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
      ...(profileData.fotoProfil && { fotoProfil: profileData.fotoProfil }),
      ...(profileData.namaAnak && { namaAnak: profileData.namaAnak }),
      ...(profileData.jenisKelamin && { jenisKelamin: profileData.jenisKelamin }),
      ...(profileData.namaOrangTua && { namaOrangTua: profileData.namaOrangTua }),
      ...(profileData.tanggalLahir && { tanggalLahir: profileData.tanggalLahir }),
      ...(profileData.alamat && { alamat: profileData.alamat }),
      ...(profileData.bbLahir !== undefined && { bbLahir: profileData.bbLahir }),
      ...(profileData.tbLahir !== undefined && { tbLahir: profileData.tbLahir }),
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
