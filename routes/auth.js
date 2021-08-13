const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
    loginUser,
    signUpUser,
    logoutUser,
    secret,
} = require("../controllers/auth");

router.post(
    "/login",
    passport.authenticate("local", { failWithError: true }),
    loginUser
);

router.post("/signUp", signUpUser);

router.get("/logout", logoutUser);

router.get("/secret", secret);

module.exports = router;
