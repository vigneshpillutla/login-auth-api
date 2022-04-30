const mongoose = require('mongoose');
const User = mongoose.model('User');

const cleanUserDB = async () => {
  return User.deleteMany({});
};

module.exports = {
  cleanUserDB
};
