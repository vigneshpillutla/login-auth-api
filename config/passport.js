const localStrategy = require('./strategy/localStrategy');
const googleStrategy = require('./strategy/googleStrategy');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (passport) {
  passport.use(localStrategy);
  passport.use(googleStrategy);
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
