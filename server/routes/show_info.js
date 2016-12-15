module.exports = function(app) {
  var conn = require('../config/db')();
  var route = require('express').Router();

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
  return route;
}
