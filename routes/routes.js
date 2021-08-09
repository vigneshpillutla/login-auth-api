const express = require('express')
const auth = require('./auth')

const router = express.Router();

router.use('/api/auth',auth);

router.get('/',(req,res)=>{
    res.status(200).json({successful:true,msg:'API is running...'})
})
router.all('*',(req,res)=>{
    res.status(400).json({
        successful:false,
        msg:'Invalid API end-point hit!'
    })
})

router.use((err,req,res,next) => {
    const statusCode = err.status ?? 400
    res.status(statusCode).json({
        success:false,
        msg: err.message
    })
})

module.exports = router;