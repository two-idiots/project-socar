module.exports = function(app) {
  var conn = require('../config/db')();
  var route = require('express').Router();

  route.get('/register', function(req, res) {
    res.render('auth/register');
  });

  route.post('/register', function(req, res) {
    var user = {
      user_id: req.body.username,
      user_name: req.body.displayName,
      phone_number: req.body.phoneNumber,
      password: req.body.password,
    };

    var sql = 'INSERT INTO users SET?';

    conn.query(sql, user, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
      } else {
        req.session.displayName = user.user_name;
        req.session.save(function() {
          res.redirect('/home');
        });
      }
    });
  });

  route.get('/login', function(req, res) {
    res.render('auth/login');
  });

  route.post('/login', function(req, res) {
    var uname = req.body.username;
    var password = req.body.password;
    var sql = 'SELECT * FROM users WHERE user_id=?';
    conn.query(sql, uname, function(err, results) {
      if(err) {
        return console.log('There is no user.');
      } else {
        var user = results[0];
        if(password == user.password) {
          req.session.displayName = user.user_name;
          res.redirect('/home');
        } else {
          console.log('NO USER');
          res.redirect('/auth/login');
        }
      }
    });
  });

  route.get('/logout', function(req, res) {
    delete req.session.displayName;
    req.session.save(function() {
      res.redirect('/home');
    });
  });

  return route;
}
