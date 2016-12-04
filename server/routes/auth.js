module.exports = function(app) {
  var route = require('express').Router();

  route.get('/login', function(req, res) {
    res.render('auth/login');
  });

  route.post('/login', function(req, res) {
    var uname = req.body.username;
    var password = req.body.password;

    res.send(uname + ', ' + password);
  });

  return route;
}
