const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');

const SALT_ROUNDS = 10;

const hashPassword = (plain) =>
  bcrypt.hash(plain, SALT_ROUNDS);

const verifyPassword = (plain, hash) =>
  bcrypt.compare(plain, hash);

const generateToken = (user) =>
  Jwt.token.generate(
    {
      userId: user.userId,
      email: user.email,
      role: user.roleId.name || user.roleId,
      fullName: user.fullName,
    },
    {
      key: process.env.JWT_SECRET,
      algorithm: 'HS256',
    },
    {
      ttlSec: 14400, // 4 jam
    }
  );

const registerUser = async ({ email, password, fullName, userId }) => {
  if (await User.findOne({ email })) {
    throw new Error('Email sudah digunakan');
  }

  const userRole = await Role.findOne({ name: 'user' });
  if (!userRole) {
    throw new Error('Role user tidak ditemukan');
  }

  const passwordHash = await hashPassword(password);
  const newUser = new User({
    userId,
    email,
    passwordHash,
    fullName,
    roleId: userRole._id,
  });

  await newUser.save();
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate('roleId');
  if (!user) throw new Error('Email tidak ditemukan');

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error('Password salah');

  const token = generateToken(user);
  return { user, token };
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  registerUser,
  loginUser,
};