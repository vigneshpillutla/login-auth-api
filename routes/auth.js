const express = require('express')
const router = express.Router()
const { loginUser, signUpUser, logoutUser, secret } = require('../controllers/auth')
const {authorizeUser} = require('../utils/jwtGenUtils')

router.post('/login',loginUser)

router.post('/signUp',signUpUser)

router.get('/logout',authorizeUser,logoutUser)

router.get('/secret',authorizeUser,secret)

module.exports = router