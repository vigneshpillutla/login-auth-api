const {
    isValidPassword,
    genHashedPassword,
    issueJWT,
} = require("../utils/jwtGenUtils");
const { UserAuthException } = require("../utils/error");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const BlackListToken = mongoose.model("BlackListToken");

const secret = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "You are authorized!",
    });
};
const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                throw new UserAuthException("User not found", 400);
            }
            const { _id, hash, salt } = user;
            const isValid = isValidPassword(password, hash, salt);

            if (isValid) {
                const { token } = issueJWT(user);
                const { firstName, lastName, email } = user;
                res.status(200).json({
                    success: true,
                    firstName,
                    lastName,
                    email,
                    token,
                });
            } else if (2 == 2) {
            } else {
                throw new UserAuthException("Invalid password", 401);
            }
        })
        .catch(next);
};

const signUpUser = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const { salt, hash } = genHashedPassword(password);
    const newUser = new User({
        firstName,
        lastName,
        email,
        salt,
        hash,
    });
    newUser
        .save()
        .then((user) => {
            const { token } = issueJWT(user);
            res.status(200).json({ success: true, token });
        })
        .catch((err) => {
            res.status(401).json({
                successful: false,
                msg: "Unable to sign up user",
            });
        });
};

const logoutUser = (req, res, next) => {
    const { exp, token } = req.jwt;
    const blackListedToken = new BlackListToken({
        expireAt: exp * 1000,
        jwt: token,
    });
    blackListedToken
        .save()
        .then((blt) => {
            res.status(200).json({ success: true, blt });
        })
        .catch(next);
};

module.exports = { loginUser, signUpUser, logoutUser, secret };
