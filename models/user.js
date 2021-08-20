const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  googleId: String,
  salt: String,
  hash: String,
});

UserSchema.plugin(findOrCreate);

mongoose.model('User', UserSchema);
