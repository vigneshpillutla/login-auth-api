const express = require('express');
const passport = require('passport');
const router = express.Router();
const google = require('./google');

// Other social routes to be added.
router.use('/google', google);

module.exports = router;
