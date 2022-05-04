import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/secrets';

const connect = () => {
  mongoose.connection.on('connected', () => {
    console.log('Connected to Database');
  });
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const disconnect = (done: (err: mongoose.NativeError) => void) => {
  mongoose.disconnect(done);
};
const dbConfig = { mongoose, connect, disconnect };
export default dbConfig;
