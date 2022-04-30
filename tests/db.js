const mongoose = require('mongoose');
const User = mongoose.model('User');

const cleanDB = async () => {
  User.deleteMany({});

  // Clear out sessions from connect-mongo as it does not use mongoose abstraction layer
  mongoose.connection.db.collection('sessions').deleteMany({});
};

module.exports = {
  cleanDB
};
