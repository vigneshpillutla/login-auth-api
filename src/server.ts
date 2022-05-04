import session from 'express-session';
import appConfig from './app';
import dbConfig from './config/database';
import sessionConfig from './config/sessions';

const { app, build } = appConfig;

build();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port number ${port}`);
});
