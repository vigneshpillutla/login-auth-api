const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')

/**
 *------ Key stored in file system needs to be shifted, probably--------
 */
const fs = require('fs')
const path = require('path')

const privateKeyPath = path.join(__dirname,'..','id_rsa_priv.pem')
const PRIVATE_KEY = fs.readFileSync(privateKeyPath,'utf-8')

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

const issueJWT = (user) => {
    const { _id } = user

    const options = {
        // When in numerical format , time is in seconds
        expiresIn: 60,
        algorithm: 'RS256'
    }
    const payload = {
        sub:_id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload,PRIVATE_KEY,options)

    return { token: `Bearer ${signedToken}` }

}

module.exports = {
    isValidPassword,
    genHashedPassword,
    issueJWT
}



