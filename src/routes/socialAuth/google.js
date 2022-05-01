const express = require('express');
const passport = require('passport');
const router = express.Router();

const DEV_CLIENT_IP = process.env.DEV_CLIENT_IP;
const PROD_CLIENT_IP = process.env.PROD_CLIENT_IP;
const CLIENT_IP =
  process.env.NODE_ENV === 'development' ? DEV_CLIENT_IP : PROD_CLIENT_IP;
router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/done',
  passport.authenticate('google', {
    successRedirect: CLIENT_IP,
    failureRedirect: CLIENT_IP,
  })
);

module.exports = router;
