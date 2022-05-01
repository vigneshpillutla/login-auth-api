const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/oauth/google/done',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    proxy: true,
  },
  function (accessToken, refreshToken, profile, cb) {
    const googleUser = profile._json;
    const newUser = {
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
      email: googleUser.email,
    };
    User.findOrCreate({ googleId: profile.id }, newUser, function (err, user) {
      return cb(err, user);
    });
  }
);

module.exports = googleStrategy;
