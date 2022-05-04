import { genHashedPassword } from '../utils/passwordAuthUtils';
import { FailedRequest } from '../utils/error';
import mongoose, { LeanDocument } from 'mongoose';
import { User, UserDocument } from '../models/user';
import asyncHandler from 'express-async-handler';
import { sendToken } from '../utils';
import { RequestHandler } from 'express';
import _ from 'lodash';

const filterUser = (user: Express.User) => {
  const filteredUser = _.pick(user, ['firstName', 'lastName', 'email']);
  return filteredUser;
};
const secret: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new FailedRequest('User not authorized!', 401);
  }
  res.status(200).json({
    success: true,
    msg: 'You are authorized!'
  });
};
const loginUser: RequestHandler = (req, res, next) => {
  const user = req.user;
  sendToken({ success: true, user: filterUser(user) }, 200, res);
};

const getUser = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    return sendToken(
      {
        success: true,
        user: filterUser(user)
      },
      200,
      res
    );
  }
  throw new FailedRequest('User not found', 401);
});
const signUpUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { salt, hash } = genHashedPassword(password);
  const existingUser = await User.findOne({ email: email }).exec();
  if (!!existingUser) {
    throw new FailedRequest('User already exists!', 400);
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
    201,
    res
  );
});

const logoutUser: RequestHandler = (req, res, next) => {
  req.logout();
  sendToken(
    {
      success: true,
      msg: 'User successfully logged out!'
    },
    200,
    res
  );
};

export { loginUser, signUpUser, logoutUser, secret, getUser };
