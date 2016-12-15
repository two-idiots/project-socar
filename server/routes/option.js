module.exports = function(app) {
  var conn = require('../config/db')();
  var route = require('express').Router();


  route.get('/new_data/option', function(req, res) {
    res.render('new_data/option');
  });

  route.post('/new_data/option', function(req, res) {
    if(req.body.safetyId != undefined && req.body.convenienceId == undefined) {
      var safetyOption = {
        safety_id: req.body.safetyId,
        safety_name: req.body.safetyName,
      };

      console.log(safetyOption);

      var sqlSafety = 'INSERT INTO safety_option SET?';

      conn.query(sqlSafety, safetyOption, function(err, results) {
        if(err) {
          console.log(err);
          res.status(500);
          console.log('이미 동일한 안전옵션이 있습니다!');
          res.redirect('/new_data/option');
        } else {
          console.log('안전옵션 등록 완료!');
          res.redirect('/new_data/option');
        }
      });
    } else if(req.body.convenienceId != undefined && req.body.safetyId == undefined) {
      var convenienceOption = {
        convenience_id: req.body.convenienceId,
        convenience_name: req.body.convenienceName,
      };

      console.log(convenienceOption);

      var sqlConvenience = 'INSERT INTO convenience_option SET?';

      conn.query(sqlConvenience, convenienceOption, function(err, results) {
        if(err) {
          console.log(err);
          res.status(500);
          console.log('이미 동일한 편의옵션이 있습니다!');
          res.redirect('/new_data/option');
        } else {
          console.log('편의옵션 등록 완료!');
          res.redirect('/new_data/option');
        }
      });
    }
  });

  return route;
}
