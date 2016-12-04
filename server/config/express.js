module.exports = function() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var session  = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  var app = express();

  app.set('views', '../client/views');
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: 'adfq@#@egadg$%@^sfg!a@$qxc2',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '111111',
      database: 'socar',
    }),
  }));

  return app;
}
