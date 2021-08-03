const express  = require('express')
const app = express()
const auth = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/auth',auth)
const port = process.env.PORT || 5000




app.get('/',(req,res)=>{
    res.status(200).json({successful:true,msg:'API is running...'})
})
app.all('*',(req,res)=>{
    res.status(400).json({
        successful:false,
        msg:'Invalid API end-point hit!'
    })
})

app.listen(port,() => {
    console.log(`Server started on port number ${port}`)
})