const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    salt: String,
    hash: String
})

mongoose.model('User', UserSchema)