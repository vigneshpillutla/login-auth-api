const express = require('express')
const router = express.Router()
const { loginUser, signUpUser, logoutUser } = require('../controllers/auth')

router.post('/login',loginUser)

router.post('/signUp',signUpUser)

router.get('/logout',logoutUser)


module.exports = router