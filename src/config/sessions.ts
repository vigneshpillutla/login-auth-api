import connectMongo from 'connect-mongo';
import { connect as connectDB } from './database';

const { create } = connectMongo;
const devConnection = process.env.DB_STRING_DEV;
const prodConnection = process.env.DB_STRING_PROD;

const dbConnection =
  process.env.NODE_ENV === 'development' ? devConnection : prodConnection;

if (!dbConnection) {
  throw new Error(
    'Database Connection string is missing, check the env files!'
  );
}

export async function connect() {
  const sessionStore = create({
    // mongoUrl: dbConnection,
    collectionName: 'sessions',
    clientPromise: connectDB().then((m) => m.connection.getClient())
  });

  return {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      // 1 week
      maxAge: 604800000
    }
  };
}
