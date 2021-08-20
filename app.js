const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
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
  credentials: true,
};
app.use(cors(corsOptions));
require('dotenv').config();
require('./config/database');

require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * --------Configuring session store ---------
 */
const sessionOptions = require('./config/sessions');
app.use(session(sessionOptions));

/**
 * --------Configuring Passport with Local Strategy--------
 */
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Include all the routes
app.use(require('./routes'));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port number ${port}`);
});
