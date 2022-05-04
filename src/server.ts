import session from 'express-session';
import appConfig from './app';
import dbConfig from './config/database';
import sessionConfig from './config/sessions';
import { PORT } from './utils/secrets';

const { app, build } = appConfig;

build();

const port = PORT;

app.listen(port, () => {
  console.log(`Server started on port number ${port}`);
});
