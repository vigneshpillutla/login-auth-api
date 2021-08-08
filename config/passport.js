const fs = require('fs');
const passport = require('passport');
const path = require('path')
const User = require('mongoose').model('User');


const publicKeyPath = path.join(__dirname,'..','id_rsa_pub.pem')
const PUBLIC_KEY = fs.readFileSync(publicKeyPath,'utf-8')

const options = {}


module.exports = (passport) => {}