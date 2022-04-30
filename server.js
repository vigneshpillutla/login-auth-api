const session = require('express-session');
const { app, build } = require('./app');
const dbConfig = require('./config/database');
const sessionConfig = require('./config/sessions');

build();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port number ${port}`);
});
