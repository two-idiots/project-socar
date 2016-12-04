module.exports = function() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var session  = require('express-session');
  var app = express();

  app.set('views', '../client/views');
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: 'adfq@#@egadg$%@^sfg!a@$qxc2',
    resave: false,
    saveUninitialized: true
  }));

  return app;
}
