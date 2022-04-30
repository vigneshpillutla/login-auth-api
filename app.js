const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const sessionConfig = require('./config/sessions');
const dbConfig = require('./config/database');

const app = express();

/**
 * ---------Setup configs---------
 */
//Add prod and dev strings here
let whitelist = ['http://localhost:3000'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

module.exports = {
  app,
  build: async () => {
    // Wait for the database connection
    await dbConfig.connect();

    require('./models/user');

    /**
     * --------Configuring session store ---------
     */
    const sessionOptions = await sessionConfig.connect();
    app.use(session(sessionOptions));

    /**
     * --------Configuring Passport with Local Strategy--------
     */
    require('./config/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // Include all the routes
    app.use(require('./routes'));
  },
  cleanUp: (done) => {
    dbConfig.disconnect(done);
  }
};
