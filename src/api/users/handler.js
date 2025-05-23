const User = require('../../models/user.model');
const Role = require('../../models/role.model');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');

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
    const users = await User.find().populate('roleId', 'name');
    return {
        error: false,
        message: 'success',
        users,
    };
};

const getUserByIdHandler = async (request, h) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return h.response({ error: true, message: 'ID tidak valid' }).code(400);
    }
    const user = await User.findById(id).populate('roleId', 'name');
    if (!user) {
        return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }
    return {
        error: false,
        message: 'success',
        user,
    };
};

const createUserHandler = async (request, h) => {
    const { error, value } = userSchema.validate(request.payload);
    if (error) {
        return h.response({ error: true, message: error.details[0].message }).code(400);
    }

    const exists = await User.findOne({ email: value.email });
    if (exists) {
        return h.response({ error: true, message: 'Email sudah terdaftar' }).code(400);
    }

    const role = await Role.findOne({ name: value.role });
    if (!role) {
        return h.response({ error: true, message: 'Role tidak ditemukan' }).code(400);
    }

    let passwordHash = '';
    if (value.password) {
        passwordHash = await bcrypt.hash(value.password, 10);
    } else {
        return h.response({ error: true, message: 'Password harus diisi' }).code(400);
    }

    const newUser = new User({
        email: value.email,
        passwordHash,
        fullName: value.fullName,
        roleId: role._id,
        namaAnak: value.namaAnak,
        jenisKelamin: value.jenisKelamin,
        namaOrangTua: value.namaOrangTua,
        tanggalLahir: value.tanggalLahir,
        beratBadan: value.beratBadan,
        tinggiBadan: value.tinggiBadan,
    });

    await newUser.save();

    return h.response({
        error: false,
        message: 'User berhasil dibuat',
        user: newUser,
    }).code(201);
};

const updateUserHandler = async (request, h) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return h.response({ error: true, message: 'ID tidak valid' }).code(400);
    }

    const { error, value } = userSchema.validate(request.payload);
    if (error) {
        return h.response({ error: true, message: error.details[0].message }).code(400);
    }

    const user = await User.findById(id);
    if (!user) {
        return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }

    const role = await Role.findOne({ name: value.role });
    if (!role) {
        return h.response({ error: true, message: 'Role tidak ditemukan' }).code(400);
    }

    let passwordHash = user.passwordHash;
    if (value.password) {
        passwordHash = await bcrypt.hash(value.password, 10);
    }

    user.email = value.email;
    user.passwordHash = passwordHash;
    user.fullName = value.fullName;
    user.roleId = role._id;
    user.namaAnak = value.namaAnak;
    user.jenisKelamin = value.jenisKelamin;
    user.namaOrangTua = value.namaOrangTua;
    user.tanggalLahir = value.tanggalLahir;
    user.beratBadan = value.beratBadan;
    user.tinggiBadan = value.tinggiBadan;

    await user.save();

    return {
        error: false,
        message: 'User berhasil diperbarui',
        user,
    };
};

const deleteUserHandler = async (request, h) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return h.response({ error: true, message: 'ID tidak valid' }).code(400);
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return h.response({ error: true, message: 'User tidak ditemukan' }).code(404);
    }

    return {
        error: false,
        message: 'User berhasil dihapus',
    };
};

module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
};
