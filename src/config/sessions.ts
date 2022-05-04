import connectMongo from 'connect-mongo';
import { SESSION_SECRET } from '../utils/secrets';
import dbConfig from './database';

const { connect: connectDB } = dbConfig;
const { create } = connectMongo;

const sessionConfig = {
  connect: async () => {
    const sessionStore = create({
      collectionName: 'sessions',
      clientPromise: connectDB().then((m) => m.connection.getClient())
    });

    return {
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        // 1 week
        maxAge: 604800000
      }
    };
  }
};

export default sessionConfig;
