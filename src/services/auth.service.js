const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');
const TokenManager = require('../token/TokenManager');
const ClientError = require('../exceptions/ClientError');

const SALT_ROUNDS = 10;

const hashPassword = (plain) => bcrypt.hash(plain, SALT_ROUNDS);
const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);

const generateTokenPair = (user) => {
  const accessPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.roleId.nama || user.roleId,
    name: user.namaLengkap,
  };
  const refreshPayload = {
    userId: user._id.toString(),
  };

  const token = TokenManager.generateAccessToken(accessPayload);
  const refreshToken = TokenManager.generateRefreshToken(refreshPayload);

  return { token, refreshToken };
};

const registerUser = async ({ email, password, namaLengkap }) => {
  if (await User.findOne({ email })) {
    throw new Error('Email sudah digunakan');
  }

  let userRole = await Role.findOne({ nama: 'user' });
  if (!userRole) {
    userRole = await new Role({ nama: 'user' }).save();
  }

  const passwordHash = await hashPassword(password);
  const newUser = new User({
    email,
    passwordHash,
    namaLengkap,
    roleId: userRole._id,
  });

  await newUser.save();
  return newUser;
};


const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate('roleId', 'nama');

  if (!user) {
    await bcrypt.hash(password, SALT_ROUNDS);
    throw new ClientError('Email atau password salah', 400); 
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw new ClientError('Email atau password salah', 400);
  }

  const { token, refreshToken } = generateTokenPair(user);
  return { user, token, refreshToken };
};


module.exports = {
  hashPassword,
  verifyPassword,
  registerUser,
  loginUser,
};
