module.exports = function(app) {
  var pbkdf2Password = require('pbkdf2-password');
  var hasher = pbkdf2Password();
  var conn = require('../config/db')();
  var route = require('express').Router();


/////////////////////////회원가입/////////////////////////
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

      var sqlUserInfo = 'INSERT INTO user SET?';

      conn.query(sqlUserInfo, user, function(err, results) {
        if(err) {
          console.log(err);
          res.status(500);
          console.log('동일한 이메일 주소가 있습니다!');
          res.redirect('/auth/register');
        } else {
          req.session.displayName = user.user_id;
          req.session.save(function() {
            res.redirect('/auth/payment');
          });
        }
      });
    });
  });


/////////////////////////결제정보삽입/////////////////////////
  route.get('/payment', function(req, res) {
    res.render('auth/payment');
  });

  route.post('/payment', function(req, res) {
    hasher({card_pw: req.body.cardPw}, function(err, pass, salt, hash) {
      var payment = {
        card_num: req.body.cardNum,
        card_name: req.body.cardName,
        card_pw: hash,
        salt: salt,
        user_id: req.session.displayName,
      };

      var sqlPaymentInfo = 'INSERT INTO payment SET?';

      conn.query(sqlPaymentInfo, payment, function(err, results) {
        if(err) {
          console.log(err);
          res.status(500);
          console.log('에러 발생!');
          res.redirect('/auth/payment');
        } else {
            //res.redirect('/home');
          res.redirect('/auth/license');
        }
      });
    });
  });


/////////////////////////면허정보삽입/////////////////////////
  route.get('/license', function(req, res) {
    res.render('auth/license');
  });

  route.post('/license', function(req, res) {
    var license = {
      license_num: req.body.licenseNum,
      license_type: req.body.licenseType,
      user_id: req.session.displayName,
    };

    var sqlLicenseInfo = 'INSERT INTO license SET?';

    conn.query(sqlLicenseInfo, license, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('에러 발생!');
        res.redirect('/auth/payment');
      } else {
          //res.redirect('/home');
        res.redirect('/home');
      }
    });
  });


/////////////////////////로그인/////////////////////////
  route.get('/login', function(req, res) {
    res.render('auth/login');
  });

  route.post('/login', function(req, res) {
    var uname = req.body.username;
    var pwd = req.body.password;
    var sql = 'SELECT * FROM user WHERE user_id=?';
    conn.query(sql, uname, function(err, results) {
      if(err) {
        console.log(uname);
        console.log(pwd);
        return console.log('There is no user.');
      } else {
        var user = results[0];
        return hasher({password: pwd, salt: user.salt}, function(err, pass, salt, hash) {
          if(hash == user.password) {
            req.session.displayName = user.user_id;
            console.log('로그인 성공!');
            res.json('0');
            // res.redirect('/home');
          } else {
            console.log('NO USER');
            res.json('1');
            // res.redirect('/auth/login');
          }
        });
      }
    });
  });


/////////////////////////로그아웃/////////////////////////
  route.get('/logout', function(req, res) {
    delete req.session.displayName;
    req.session.save(function() {
      res.redirect('/home');
    });
  });

  return route;
}
