
const loginUser = (req,res) => {
    const { email, password } = req.body
    if(email && password){
        return res.status(200).json({
            successful:true,
            data:{ email, password },
            msg:'User Authorized'
        })
    }
    res.status(400).json({
        successful:false,
        data:{},
        msg:'User not Authorized'
    })
}

const signUpUser = (req,res) => {
    const { firstName, lastName, email, password } = req.body

    if(firstName && lastName && email && password ) {
        return res.status(200).json({
            successful:true,
            data:{ firstName, lastName, email },
            msg:'User registered!'
        })
    }
    res.status(400).json({
        successful:false,
        data:{},
        msg:'Could not sign up user!'
    })
}

const logoutUser = (req,res) => {
    res.status(200).json({
        successful:true,
        msg:'User logged out!'
    })
}


module.exports = { loginUser, signUpUser, logoutUser }