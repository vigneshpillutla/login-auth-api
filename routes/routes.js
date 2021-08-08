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

module.exports = router;