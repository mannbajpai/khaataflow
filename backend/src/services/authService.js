import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

const checkExistingUser = async (email, username) => {
  const existingEmail = await User.findOne({ where: { email } });
  const existingUsername = await User.findOne({ where: { username } });

  if (existingEmail) {
    throw new Error('Email is already in use');
  }

  if (existingUsername) {
    throw new Error('Username is already in use');
  }
};

const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(`Password hashed :${hashedPassword}`)
  return await User.create({ username: username, email: email, password: hashedPassword });
};

const validateUserCredentials = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  return user;
};

const authService = {
  createToken,
  comparePassword,
  checkExistingUser,
  createUser,
  validateUserCredentials,
};

export default authService;