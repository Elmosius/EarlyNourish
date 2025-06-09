const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const profileService = require('../../services/profile.service');
const ProfileValidator = require('../../validator/profile');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

const getProfileHandlerImpl = async (request, h) => {
  const { userId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new InvariantError('User ID tidak valid');
  }

  const user = await profileService.getUserById(userId);
  if (!user) throw new NotFoundError('User tidak ditemukan');

  return h.response({
    Error: false,
    Message: 'success',
    profile: user,
  }).code(200);
};

const getProfileHandler = async (request, h) => {
  try {
    return await getProfileHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal mengambil profil' }).code(500);
  }
};

const updateProfileHandlerImpl = async (request, h) => {
  const { userId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new InvariantError('User ID tidak valid');
  }

  const data = request.payload;
  let photoPath = null;
  
  if (data.fotoProfil && typeof data.fotoProfil._data !== 'undefined') {
    const filename = `${Date.now()}-${data.fotoProfil.hapi.filename}`;
    const uploadPath = path.join(__dirname, '../../uploads', filename);

    await fs.promises.writeFile(uploadPath, data.fotoProfil._data);
    photoPath = `uploads/${filename}`;
  }

  const updatePayload = {
    ...data,
    ...(photoPath && { fotoProfil: photoPath }),
  };
  delete updatePayload.email;

  const updatedUser = await profileService.updateUserProfile(userId, updatePayload);
  if (!updatedUser) throw new NotFoundError('User tidak ditemukan');

  return h.response({
    Error: false,
    Message: 'success',
    profile: updatedUser,
  }).code(200);
};

const updateProfileHandler = async (request, h) => {
  try {
    return await updateProfileHandlerImpl(request, h);
  } catch (err) {
    if (err instanceof ClientError) {
      return h.response({ Error: true, Message: err.message }).code(err.statusCode);
    }
    console.error(err);
    return h.response({ Error: true, Message: 'Gagal memperbarui profil' }).code(500);
  }
};

module.exports = {
  getProfileHandler,
  updateProfileHandler,
};
