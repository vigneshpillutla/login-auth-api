import asyncHandler from 'express-async-handler';
import { loginSchema, signUpSchema } from './schemas';

const validateLogin = asyncHandler(async (req, res, next) => {
  await loginSchema.validateAsync(req.body);
  next();
});

const validateSignUp = asyncHandler(async (req, res, next) => {
  await signUpSchema.validateAsync(req.body);
  next();
});

export { validateLogin, validateSignUp };
