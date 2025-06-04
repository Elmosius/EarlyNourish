const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');
const TokenManager = require('../token/TokenManager');

const SALT_ROUNDS = 10;

const hashPassword = (plain) => bcrypt.hash(plain, SALT_ROUNDS);
const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);

const generateTokenPair = (user) => {
  const accessPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.roleId.nama || user.roleId,
    fullName: user.fullName,
  };
  const refreshPayload = {
    userId: user._id.toString(),
  };

  const accessToken = TokenManager.generateAccessToken(accessPayload);
  const refreshToken = TokenManager.generateRefreshToken(refreshPayload);

  return { accessToken, refreshToken };
};

const registerUser = async ({ email, password, fullName }) => {
  if (await User.findOne({ email })) {
    throw new Error('Email sudah digunakan');
  }

  const userRole = await Role.findOne({ nama: 'user' });
  if (!userRole) {
    throw new Error('Role user tidak ditemukan');
  }

  const passwordHash = await hashPassword(password);
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
  const user = await User.findOne({ email }).populate('roleId', 'nama');
  if (!user) throw new Error('Email tidak ditemukan');

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error('Password salah');

  const { accessToken, refreshToken } = generateTokenPair(user);
  return { user, accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  const decoded = TokenManager.verifyRefreshToken(refreshToken);
  const userId = decoded.userId;

  const user = await User.findById(userId).populate('roleId', 'nama');
  if (!user) throw new Error('User tidak ditemukan');

  const accessPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.roleId.nama || user.roleId,
    fullName: user.fullName,
  };
  return TokenManager.generateAccessToken(accessPayload);
};

module.exports = {
  hashPassword,
  verifyPassword,
  registerUser,
  loginUser,
  refreshAccessToken,
};