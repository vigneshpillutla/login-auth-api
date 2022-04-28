const { genHashedPassword } = require('../utils/passwordAuthUtils');
const { FailedRequest } = require('../utils/error');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const asyncHandler = require('express-async-handler');
const { sendToken } = require('../utils');

const filterUser = (user) => {
  user = Object.entries(user).filter(
    ([key, _]) => !['hash', 'salt', '_id', '__v'].includes(key)
  );
  user = Object.fromEntries(user);
  return user;
};
const secret = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new FailedRequest('User not authorized!', 401);
  }
  res.status(200).json({
    success: true,
    msg: 'You are authorized!'
  });
};
const loginUser = (req, res, next) => {
  let user = req.user.toObject();
  user = filterUser(user);
  res.json({ success: true, user });
};

const getUser = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.user.toObject();
    user = filterUser(user);
    return res.status(200).json({
      success: true,
      user
    });
  }
  throw new FailedRequest('User not found', 401);
});
const signUpUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { salt, hash } = genHashedPassword(password);
  const existingUser = await User.findOne({ email: email }).exec();
  if (!!existingUser) {
    throw new FailedRequest('User already exists!', 401);
  }
  const newUser = new User({
    firstName,
    lastName,
    email,
    salt,
    hash
  });
  const user = await newUser.save();
  sendToken(
    {
      success: true,
      msg: 'User successfully signed up!',
      user: filterUser(user)
    },
    200,
    res
  );
  // .then((user) => {
  //   user = filterUser(user?.toObject());
  //   res.status(200).json({
  //     success: true,
  //     msg: 'User successfully signed up!',
  //     user,
  //   });
  // })
  // .catch((err) => {
  //   res.status(401).json({
  //     success: false,
  //     msg: 'Unable to sign up user',
  //     err,
  //   });
  // });
});

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).json({
    success: true,
    msg: 'User successfully logged out!'
  });
};

module.exports = { loginUser, signUpUser, logoutUser, secret, getUser };
