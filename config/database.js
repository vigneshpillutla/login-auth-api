const mongoose = require('mongoose');

require('dotenv').config();

const devConnection = process.env.DB_STRING_DEV;
const prodConnection = process.env.DB_STRING_PROD;

const dbConnection =
  process.env.NODE_ENV === 'development' ? devConnection : prodConnection;

if (!dbConnection) {
  throw new Error(
    'Database Connection string is missing, check the env files!'
  );
}

module.exports = {
  mongoose,
  connect: () => {
    mongoose.connection.on('connected', () => {
      console.log('Connected to Database');
    });
    return mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  },
  disconnect: (done) => {
    // mongoose.connection.close();
    // done();
    mongoose.disconnect(done);
  }
};
