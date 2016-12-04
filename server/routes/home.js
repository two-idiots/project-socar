module.exports = function(app) {
  var route = require('express').Router();

  route.get('/home', function(req, res) {
    var username = req.session.displayName;

    var user = {
      name: username,
    };

    if(username) {
      res.render('home', {user: {name: username}});
    } else {
      res.render('home', {user: {name: undefined}});
    }
  });

  return route;
}
