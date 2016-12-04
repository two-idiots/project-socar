module.exports = function(app) {
  var route = require('express').Router();

  route.get('/home', function(req, res) {
    res.render('home');
  });

  return route;
}
