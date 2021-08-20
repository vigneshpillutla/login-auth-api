const MongoStore = require('connect-mongo');

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

const sessionStore = MongoStore.create({
  mongoUrl: dbConnection,
  collectionName: 'sessions',
});

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    // 1 week
    maxAge: 604800000,
  },
};

module.exports = sessionOptions;
