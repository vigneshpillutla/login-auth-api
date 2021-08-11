const mongoose = require('mongoose')

const BlackListTokenSchema = new mongoose.Schema({
    jwt:String,
    expireAt:{
        type:Date,
        default:null
    }
})

BlackListTokenSchema.index({expireAt:1},{expireAfterSeconds:0})

mongoose.model("BlackListToken",BlackListTokenSchema)
