const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
})

mongoose.model('User', UserSchema)