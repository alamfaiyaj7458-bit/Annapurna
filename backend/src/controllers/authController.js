const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const loginSchema = Joi.object({
  username: Joi.string().trim().lowercase().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
});

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = value;

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.json({
      _id: req.admin._id,
      username: req.admin.username,
    });
  } catch (err) {
    next(err);
  }
};

const seedAdmin = async () => {
  const exists = await Admin.findOne({ username: 'admin' });
  if (!exists) {
    if (!process.env.ADMIN_DEFAULT_PASSWORD) {
      console.warn('WARNING: ADMIN_DEFAULT_PASSWORD is not set. Using insecure fallback. Change the password immediately after first login.');
    }
    await Admin.create({
      username: 'admin',
      password: process.env.ADMIN_DEFAULT_PASSWORD || 'Annapurna@2024',
    });
    console.log('Default admin created. Change the password via the API immediately.');
  }
};

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
  }),
  newPassword: Joi.string().min(8).required().messages({
    'any.required': 'New password is required',
    'string.min': 'New password must be at least 8 characters',
  }),
});

const changePassword = async (req, res, next) => {
  try {
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin || !(await admin.matchPassword(value.currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    admin.password = value.newPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, getMe, seedAdmin, changePassword };
