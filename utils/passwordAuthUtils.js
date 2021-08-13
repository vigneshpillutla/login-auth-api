const crypto = require("crypto");

const isValidPassword = (password, hash, salt) => {
    let reHashed = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hash === reHashed;
};

const genHashedPassword = (password) => {
    let salt = crypto.randomBytes(32).toString("hex");
    let hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

    return {
        salt,
        hash,
    };
};
module.exports = {
    isValidPassword,
    genHashedPassword,
};
