const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');

// @descr  Register User
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Fill all fields');
  }

  // User exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @descr  Login User
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check email exist
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @descr  User data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  });
});

// Json token function here signing with _id. we can sign it with anything
const generateJwt = _id => {
  return jwt.sign({ _id }, process.env.JWT_SECRETKEY, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
