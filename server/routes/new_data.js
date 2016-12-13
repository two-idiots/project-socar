module.exports = function(app) {
  var conn = require('../config/db')();
  var route = require('express').Router();

  route.get('/car', function(req, res) {
    res.render('new_data/car');
  });

  route.post('/car', function(req, res) {
    var car = {
      car_name: req.body.carName,
      automaker: req.body.automaker,
      car_model: req.body.carModel,
      car_outside: req.body.carOutside,
      oil_type: req.body.oilType,
      gear_type: req.body.gearType,
      capavity: req.body.capavity,
      basic_charge: req.body.basicCharge,
      driving_charge: req.body.drivingCharge,
    };

    var sql = 'INSERT INTO car SET?';

    conn.query(sql, car, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('이미 동일한 자동차가 있습니다!');
        res.redirect('/new_data/car');
      } else {
        console.log('자동차 정보 등록 완료!');
        res.redirect('/home');
      }
    });
  });

  route.get('/area', function(req, res) {
    res.render('new_data/area');
  });

  route.post('/area', function(req, res) {
    var area = {
      area_name: req.body.areaName,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    };

    var sql = 'INSERT INTO area SET?';

    conn.query(sql, area, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('이미 동일한 지역이 있습니다!');
        res.redirect('/new_data/area');
      } else {
        console.log('지역 등록 완료!');
        res.redirect('/home');
      }
    });
  });

  return route;
}
