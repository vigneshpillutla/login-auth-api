const fs = require('fs');
const path = require('path')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('mongoose').model('User');


const publicKeyPath = path.join(__dirname,'..','id_rsa_pub.pem')
const PUBLIC_KEY = fs.readFileSync(publicKeyPath,'utf-8')

const options = {
    secretOrKey: PUBLIC_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms:['RS256']
}

const strategy = new JwtStrategy(options,(payload,done) => {
    User.findOne({ _id: payload.sub })
        .then(user => {
            if (user){
                return done(null,user)
            }
            return done(null,false)
        })
        .catch(err => done(err,false))
})


module.exports = (passport) => {
    passport.use(strategy)
}