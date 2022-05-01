const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  loginUser,
  signUpUser,
  logoutUser,
  secret,
  getUser
} = require('../controllers/auth');
const { validateLogin, validateSignUp } = require('../validation');

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

module.exports = router;
