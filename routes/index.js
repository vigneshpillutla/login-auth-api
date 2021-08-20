const express = require('express');
const auth = require('./auth');
const socialAuth = require('./socialAuth');

const router = express.Router();
router.use('/api/auth', auth);
router.use('/api/oauth', socialAuth);
router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'API is running...' });
});
router.all('*', (req, res) => {
  res.status(400).json({
    success: false,
    msg: 'Invalid API end-point hit!',
    url: req.url,
  });
});

router.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  res.status(statusCode).json({
    success: false,
    msg: err.message,
  });
});

module.exports = router;
