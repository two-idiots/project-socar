module.exports = function() {
  var express = require('express');
  var app = express();

  app.set('views', '../client/views');
  app.set('view engine', 'ejs');

  return app;
}
