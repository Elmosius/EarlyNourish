const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');

const SALT_ROUNDS = 10;

const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (user) => {
  return Jwt.token.generate(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.roleId.name || user.roleId, 
      fullName: user.fullName,
    },
    {
      key: process.env.JWT_SECRET,
      algorithm: 'HS256',
    },
    {
      ttlSec: 14400, 
    }
  );
};

const registerUser = async ({ email, password, fullName }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email sudah digunakan');

  const passwordHash = await hashPassword(password);

  const userRole = await Role.findOne({ name: 'user' });
  if (!userRole) throw new Error('Role user tidak ditemukan');

  const newUser = new User({
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
