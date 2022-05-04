import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else {
  throw new Error(
    'No .env file found. Configure dotenv or add .env to the root of the app.'
  );
}

const PORT = process.env.PORT || 5000;

const ENVIRONMENT = process.env.NODE_ENV;
const PROD = ENVIRONMENT === 'production'; // Anything else is 'development'

const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI = PROD
  ? process.env.DB_STRING_PROD
  : process.env.DB_STRING_DEV;

if (!SESSION_SECRET) {
  throw new Error('No session secret has been provided');
}

if (!MONGODB_URI) {
  throw new Error(
    `No mongo connection uri has been provided for ${
      PROD ? 'production' : 'development'
    } environment`
  );
}

export { ENVIRONMENT, PROD, MONGODB_URI, SESSION_SECRET, PORT };
