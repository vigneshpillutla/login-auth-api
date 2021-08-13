const { genHashedPassword } = require("../utils/passwordAuthUtils");
const { UserAuthException } = require("../utils/error");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const FilterUser = (user) => {
    user = Object.entries(user).filter(
        ([key, _]) => !["hash", "salt", "_id", "__v"].includes(key)
    );
    user = Object.fromEntries(user);
    return user;
};
const secret = (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new UserAuthException("User not authorized!", 401);
    }
    res.status(200).json({
        success: true,
        msg: "You are authorized!",
    });
};
const loginUser = (req, res, next) => {
    let user = req.user.toObject();
    user = FilterUser(user);
    res.json({ success: true, user });
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
            user = FilterUser(user?.toObject());
            res.status(200).json({
                success: true,
                msg: "User successfully signed up!",
                user,
            });
        })
        .catch((err) => {
            res.status(401).json({
                successful: false,
                msg: "Unable to sign up user",
                err,
            });
        });
};

const logoutUser = (req, res, next) => {
    req.logout();
    res.status(200).json({
        success: true,
        msg: "User successfully logged out!",
    });
};

module.exports = { loginUser, signUpUser, logoutUser, secret };
