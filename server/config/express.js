module.exports = function() {
  var express = require('express');
  var bodyParser = require('body-parser');
  var app = express();

  app.set('views', '../client/views');
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
}
