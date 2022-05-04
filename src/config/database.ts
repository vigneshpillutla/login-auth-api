import mongoose from 'mongoose';

const connect = () => {
  const devConnection = process.env.DB_STRING_DEV;
  const prodConnection = process.env.DB_STRING_PROD;

  const dbConnection =
    process.env.NODE_ENV === 'development' ? devConnection : prodConnection;

  if (!dbConnection) {
    throw new Error(
      'Database Connection string is missing, check the env files!'
    );
  }
  mongoose.connection.on('connected', () => {
    console.log('Connected to Database');
  });
  return mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const disconnect = (done: (err: mongoose.NativeError) => void) => {
  mongoose.disconnect(done);
};
const dbConfig = { mongoose, connect, disconnect };
export default dbConfig;
