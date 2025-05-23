const User = require('../../models/user.model');
const Role = require('../../models/role.model');
const Joi = require('joi');
const mongoose = require('mongoose');

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

    const user = await User.findById(userId).populate('roleId', 'name');
    if (!user) {
        return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }

    return {
        error: false,
        message: 'success',
        profile: user,
    };
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

    const user = await User.findById(userId);
    if (!user) {
        return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }

    user.email = value.email;
    user.fullName = value.fullName;
    user.namaAnak = value.namaAnak;
    user.jenisKelamin = value.jenisKelamin;
    user.namaOrangTua = value.namaOrangTua;
    user.tanggalLahir = value.tanggalLahir;
    user.beratBadan = value.beratBadan;
    user.tinggiBadan = value.tinggiBadan;

    await user.save();

    return {
        error: false,
        message: 'success',
        profile: user,
    };
};

module.exports = {
    getProfileHandler,
    updateProfileHandler,
};
