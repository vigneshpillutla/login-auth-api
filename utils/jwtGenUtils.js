const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const BlackListToken = mongoose.model('BlackListToken')


/**
 *------ Key stored in file system needs to be shifted, probably--------
 */
const fs = require('fs')
const path = require('path')
const { UserAuthException } = require('./error')

const privateKeyPath = path.join(__dirname,'..','id_rsa_priv.pem')
const publicKeyPath = path.join(__dirname,'..','id_rsa_pub.pem')
const PRIVATE_KEY = fs.readFileSync(privateKeyPath,'utf-8')
const PUBLIC_KEY = fs.readFileSync(publicKeyPath,'utf-8')

// ---------------------Re think use of file system---------------------------

const isValidPassword = (password, hash, salt) => {
    let reHashed = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
    return hash === reHashed
}

const genHashedPassword = (password) => {
    let salt = crypto.randomBytes(32).toString('hex')
    let hash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')

    return ({
        salt,
        hash
    })
}
const authorizeUser = async(req,res,next) => {
    const {authorization} = req.headers
    if(authorization){
        const [text,token] = authorization.split(' ')
        if(text === 'Bearer' && token.match(/\S+\.\S+\.\S+/) !== null){
            try{
                const blt = await BlackListToken.findOne({jwt:token})
                if(blt){
                    throw new UserAuthException("Invalid signature",401)
                }
                const decodedVerification = jsonwebtoken.verify(token,PUBLIC_KEY,{ algorithms:['RS256'] })
                req.jwt = {
                    ...decodedVerification,
                    token
                }

                next()
            }
            catch(err){
                next(err)
            }
        }
    }

    throw new UserAuthException("Invalid token!",401)
}

const issueJWT = (user) => {
    const { _id } = user

    const options = {
        expiresIn: "1w",
        algorithm: 'RS256'
    }
    const payload = {
        sub:_id,
        iat: Math.floor(Date.now()/1000)
    }

    const signedToken = jsonwebtoken.sign(payload,PRIVATE_KEY,options)

    return { token: `Bearer ${signedToken}` }

}

module.exports = {
    isValidPassword,
    genHashedPassword,
    authorizeUser,
    issueJWT
}



