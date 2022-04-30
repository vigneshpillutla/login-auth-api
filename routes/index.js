const express = require('express');
const mongoose = require('mongoose');
const { sendToken } = require('../utils');
const auth = require('./auth');
const socialAuth = require('./socialAuth');

const router = express.Router();
router.use('/api/auth', auth);

//   ************** Temporarily disabling OAuth ***************
// router.use('/api/oauth', socialAuth);

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'API is running...' });
});
router.all('*', (req, res) => {
  res.status(400).json({
    success: false,
    msg: 'Invalid API end-point hit!',
    url: req.url
  });
});

router.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  sendToken(
    {
      success: false,
      msg: err.message
    },
    statusCode,
    res
  );
});

module.exports = router;
