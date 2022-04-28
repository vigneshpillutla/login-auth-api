const asyncHandler = require('express-async-handler');
const { loginSchema, signUpSchema } = require('./schemas');

const validateLogin = asyncHandler(async (req, res, next) => {
  await loginSchema.validateAsync(req.body);
  next();
});

const validateSignUp = asyncHandler(async (req, res, next) => {
  await signUpSchema.validateAsync(req.body);
  next();
});

module.exports = {
  validateLogin,
  validateSignUp
};
