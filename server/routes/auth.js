module.exports = function(app) {
  var route = require('express').Router();

  route.get('/login', function(req, res) {
    res.render('auth/login');
  });

  return route;
}
