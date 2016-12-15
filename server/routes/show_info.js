module.exports = function(app) {
  var conn = require('../config/db')();
  var route = require('express').Router();


/////////////////////////CAR 정보 가져오기/////////////////////////
  route.get('/car_info', function(req, res) {
    res.render('reserve/car_info', {keyResults: [{carResults: undefined}]});
  });

  route.post('/car_info', function(req, res) {
    var carName = req.body.car;
    console.log(carName);

    var sqlCarInfo = 'SELECT * FROM car WHERE car_name = ?';
    var sqlCarSafety = 'SELECT so.safety_id, so.safety_name FROM car_safety_option cso, safety_option so WHERE cso.car_name = ? and cso.safety_id = so.safety_id';
    var sqlCarConvenience = 'SELECT co.convenience_id, co.convenience_name FROM car_convenience_option cco, convenience_option co WHERE cco.car_name = ? and cco.convenience_id = co.convenience_id';

    conn.query(sqlCarInfo, carName, function(err, results1) {
      if(err) {
          console.log(err);
          res.status(500);
          console.log('에러 발생!');
          //res.redirect('/reserve/car_info');
        } else {
          var car = [];
          car.push({basicOp: results1[0]});

          conn.query(sqlCarSafety, carName, function(err, results2) {
            if(err) {
                console.log(err);
                res.status(500);
                console.log('에러 발생!');
                //res.redirect('/reserve/car_info');
              } else {
                var safetyOp = [];
                for(var i in results2) {
                  safetyOp.push(results2[i].safety_name);
                }
                car.push({safety: safetyOp});

                conn.query(sqlCarConvenience, carName, function(err, results3) {
                  if(err) {
                      console.log(err);
                      res.status(500);
                      console.log('에러 발생!');
                      //res.redirect('/reserve/car_info');
                    } else {
                      var convenienceOp = [];
                      for(var i in results3) {
                        convenienceOp.push(results3[i].convenience_name);
                      }
                      car.push({convenience: convenienceOp});
                      console.log(car);
                      res.json(car);
                    }
                });
              }
          });
        }
    });
  });


/////////////////////////쏘카존 자동차 가져오기/////////////////////////
  route.get('/socar_info', function(req, res) {
    res.render('reserve/socar_info');
  });

  route.post('/socar_info', function(req, res) {
    var areaName = req.body.areaName;

    var sql = 'SELECT szc.car_name, szc.car_num, szc.nick_name, a.area_name, latitude, longitude FROM socar_zone_car szc, area a WHERE szc.area_name = ? and szc.area_name = a.area_name';

    conn.query(sql, areaName, function(err, results) {
      if(err) {
          console.log(err);
          res.status(500);
          console.log('에러 발생!');
          //res.redirect('/reserve/car_info');
        } else {
          var socarZoneCars = {
            areaName : results[0].area_name,
            socarInfo : []
          }
          for(var i in results) {
            delete results[i].area_name;
            socarZoneCars.socarInfo.push(results[i]);
          }
        }
      res.json(socarZoneCars);
    });
  });


  /////////////////////////예약정보 가져오기/////////////////////////
  route.get('/rental_info', function(req, res) {
    res.render('reserve/rental_info');
  });

  route.post('/rental_info', function(req, res) {
    var sql = 'SELECT * FROM rental_info WHERE user_id = ?';
    conn.query(sql, req.session.displayName, function(err, results) {
      if(err) {
          console.log(err);
          res.status(500);
          console.log('에러 발생!');
          //res.redirect('/reserve/car_info');
        } else {
          console.log(results);
          res.redirect('/rental_info');
        }
    });
  });

  return route;
}
