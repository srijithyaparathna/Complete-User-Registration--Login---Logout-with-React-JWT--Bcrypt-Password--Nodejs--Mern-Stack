const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

// REGISTER USER
exports.signup = async (req, res, next) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return next(createError('User already exists!', 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Assign a JWT token to the user
    const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
      expiresIn: '90d',
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(createError('Please provide email and password!', 400));
    }

    // Check if the user exists and get the password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(createError('User not found!', 401));
    }

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(createError('Invalid email or password!', 401));
    }

    // If the user is authenticated, generate a JWT token
    const token = jwt.sign({ _id: user._id }, 'secretkey123', {
      expiresIn: '90d',
    });

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
