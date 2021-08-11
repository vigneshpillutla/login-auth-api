const express  = require('express')
const cors = require('cors')
const app = express()

/**
 * ---------Setup configs---------
 */
require('dotenv').config()
require('./config/database')


require('./models/user')
require('./models/token')


app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Include all the routes
app.use(require('./routes/routes'))
const port = process.env.PORT || 5000



app.listen(port,() => {
    console.log(`Server started on port number ${port}`)
})