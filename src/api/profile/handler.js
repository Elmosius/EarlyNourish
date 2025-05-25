const mongoose = require('mongoose');
const profileService = require('../../services/profile.service');
const Joi = require('joi');

const profileSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  namaAnak: Joi.string().optional().allow(''),
  jenisKelamin: Joi.string().valid('male', 'female').optional(),
  namaOrangTua: Joi.string().optional().allow(''),
  tanggalLahir: Joi.date().optional(),
  beratBadan: Joi.number().optional(),
  tinggiBadan: Joi.number().optional(),
});

const getProfileHandler = async (request, h) => {
  const { userId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return h.response({ error: true, message: 'User ID tidak valid' }).code(400);
  }
  try {
    const user = await profileService.getUserById(userId);
    if (!user) {
      return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }
    return {
      error: false,
      message: 'success',
      profile: user,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal mengambil profil' }).code(500);
  }
};

const updateProfileHandler = async (request, h) => {
  const { userId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return h.response({ error: true, message: 'User ID tidak valid' }).code(400);
  }

  const { error, value } = profileSchema.validate(request.payload);
  if (error) {
    return h.response({ error: true, message: error.details[0].message }).code(400);
  }

  try {
    const updatedUser = await profileService.updateUserProfile(userId, value);
    if (!updatedUser) {
      return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }
    return {
      error: false,
      message: 'success',
      profile: updatedUser,
    };
  } catch (err) {
    console.error(err);
    return h.response({ error: true, message: 'Gagal memperbarui profil' }).code(500);
  }
};

module.exports = {
  getProfileHandler,
  updateProfileHandler,
};
