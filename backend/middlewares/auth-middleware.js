const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

      // get user from token
      req.user = await User.findById(decoded._id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, No token');
  }
});

module.exports = { protect };
