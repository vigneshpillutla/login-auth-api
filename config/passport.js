const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { isValidPassword } = require("../utils/passwordAuthUtils");

const fieldOptions = {
    usernameField: "email",
    passwordField: "password",
};

const localStrategy = new LocalStrategy(
    fieldOptions,
    (username, password, done) => {
        User.findOne({ email: username })
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }
                const { hash, salt } = user;
                if (!isValidPassword(password, hash, salt)) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err) => done(err, false));
    }
);

module.exports = function (passport) {
    passport.use(localStrategy);
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
