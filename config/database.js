const mongoose = require('mongoose')

require('dotenv').config()

const devConnection = process.env.DB_STRING_DEV
const prodConnection = process.env.DB_STRING_PROD

const dbConnection = process.env.NODE_ENV === 'development' ? devConnection : prodConnection

mongoose.connect(dbConnection,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',() => {
    console.log('Connected to Database')
})

