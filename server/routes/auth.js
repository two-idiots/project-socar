module.exports = function(app) {
  var pbkdf2Password = require('pbkdf2-password');
  var hasher = pbkdf2Password();
  var conn = require('../config/db')();
  var route = require('express').Router();

  route.get('/register', function(req, res) {
    res.render('auth/register');
  });

  route.post('/register', function(req, res) {
    hasher({password: req.body.password}, function(err, pass, salt, hash) {
      var user = {
        user_id: req.body.username,
        user_name: req.body.displayName,
        phone_number: req.body.phoneNumber,
        password: hash,
        salt: salt,
      };

      var sql = 'INSERT INTO user SET?';

      conn.query(sql, user, function(err, results) {
        if(err) {
          console.log(err);
          res.status(500);
          console.log('동일한 이메일 주소가 있습니다!');
          res.redirect('/auth/register');
        } else {
          req.session.displayName = user.user_name;
          req.session.save(function() {
            res.redirect('/home');
          });
        }
      });
    });
  });

  route.get('/login', function(req, res) {
    res.render('auth/login');
  });

  route.post('/login', function(req, res) {
    var uname = req.body.username;
    var pwd = req.body.password;
    var sql = 'SELECT * FROM user WHERE user_id=?';
    conn.query(sql, uname, function(err, results) {
      if(err) {
        return console.log('There is no user.');
      } else {
        var user = results[0];
        return hasher({password: pwd, salt: user.salt}, function(err, pass, salt, hash) {
          if(hash == user.password) {
            req.session.displayName = user.user_name;
            res.redirect('/home');
          } else {
            console.log('NO USER');
            res.redirect('/auth/login');
          }
        });
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
