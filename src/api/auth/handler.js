const User = require('../../models/user.model');
const Role = require('../../models/role.model');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');

const registerHandler = async (request, h) => {
    const { email, password, fullName } = request.payload;

    const exists = await User.findOne({ email });
    if (exists) {
        return h.response({ error: true, message: 'Email sudah terdaftar' }).code(400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userRole = await Role.findOne({ name: 'user' });
    if (!userRole) {
        return h.response({ error: true, message: 'Role user tidak ditemukan' }).code(500);
    }

    const user = new User({
        email,
        passwordHash,
        fullName,
        roleId: userRole._id,
    });

    await user.save();

    return h.response({ error: false, message: 'User berhasil dibuat' }).code(201);
};

const loginHandler = async (request, h) => {
    const { email, password } = request.payload;
    const user = await User.findOne({ email }).populate('roleId');
    if (!user) {
        return h.response({ error: true, message: 'Email tidak ditemukan' }).code(401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return h.response({ error: true, message: 'Password salah' }).code(401);
    }

    const token = Jwt.token.generate(
        {
        userId: user._id.toString(),
        email: user.email,
        role: user.roleId.name,
        fullName: user.fullName,
        },
        {
        key: process.env.JWT_SECRET,
        algorithm: 'HS256',
        }
    );

    return {
        error: false,
        message: 'success',
        loginResult: {
        userId: user._id.toString(),
        name: user.fullName,
        token,
        },
    };
};

module.exports = { registerHandler, loginHandler };
