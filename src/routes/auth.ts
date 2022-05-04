import express from 'express';
import passport from 'passport';
const router = express.Router();
import {
  loginUser,
  signUpUser,
  logoutUser,
  secret,
  getUser
} from '../controllers/auth';
import { validateLogin, validateSignUp } from '../validation';

router.post(
  '/login',
  validateLogin,
  passport.authenticate('local', { failWithError: true }),
  loginUser
);

router.post('/signUp', validateSignUp, signUpUser);

router.get('/getUser', getUser);

router.get('/logout', logoutUser);

router.get('/secret', secret);

export default router;
