module.exports = function(app) {
  var conn = require('../config/db')();
  var route = require('express').Router();


/////////////////////////자동차 정보 등록/////////////////////////
  route.get('/car', function(req, res) {
    res.render('new_data/car');
  });

  route.post('/car', function(req, res) {
    var safetyOptionName = []; // 안전옵션
    var convenienceOptionName = []; // 편의옵션

    var safetyOptionId = []; // safety_option 테이블로부터 가져온 safety_id
    var convenienceOptionId = []; // convenience_option 테이블로부터 가져온 safety_id

    var safetyOptionData = []; // car_safety_option 테이블에 저장할 배열
    var convenienceOptionData = []; // car_convenience_option 테이블에 저장할 배열

    var firstCount = 1;
    var secondCount = 1;

    var basicCarInfo = {
      car_name: req.body.carName,
      automaker: req.body.automaker,
      car_model: req.body.carModel,
      car_outside: req.body.carOutside,
      oil_type: req.body.oilType,
      gear_type: req.body.gearType,
      capavity: req.body.capavity,
      basic_charge: req.body.basicCharge,
      driving_charge: req.body.drivingCharge,
      image: req.body.image,
    };
    console.log('basicCarInfo', basicCarInfo);

    // 안전옵션 받아오기
    for(var i in req.body.safetyName) {
      safetyOptionName.push(req.body.safetyName[i]);
    }
    console.log('safetyOptionName', safetyOptionName);

    // 편의옵션 받아오기
    for(var i in req.body.convenienceName) {
      convenienceOptionName.push(req.body.convenienceName[i]);
    }
    console.log('convenienceOptionName', convenienceOptionName);

    var sqlCarInfo = 'INSERT INTO car SET?';
    var sqlSafetyInfo = 'SELECT so.safety_id FROM safety_option so WHERE so.safety_name = ?';
    var sqlConvenienceInfo = 'SELECT co.convenience_id FROM convenience_option co WHERE co.convenience_name = ?';
    var sqlCarSafetyOption = 'INSERT INTO car_safety_option SET?';
    var sqlCarConvenienceOption = 'INSERT INTO car_convenience_option SET?';
    // var sqlCarConvenience = '';
    // //var sqlSafety = 'SELECT * FROM safety_option WHERE safety_id = ?';
    // //var sqlConvenience = 'SELECT * FROM convenience_option WHERE convenience_id = ?';
    //
    conn.query(sqlCarInfo, basicCarInfo, function(err, results1) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('에러 발생!');
        //res.redirect('/new_data/car');
      } else {
        console.log('자동차 정보 등록 완료!');

        for(var i in safetyOptionName) {
          conn.query(sqlSafetyInfo, safetyOptionName[i], function(err, results2) {
            if(err) {
              console.log(err);
              res.status(500);
              console.log('에러 발생!');
              //res.redirect('/new_data/car');
            } else {
              safetyOptionId.push(results2[0].safety_id); // 안전옵션아이디 받아오기

              if(safetyOptionId.length == safetyOptionName.length) {
                for(var j in convenienceOptionName) {
                  conn.query(sqlConvenienceInfo, convenienceOptionName[j], function(err, results3) {
                    if(err) {
                      console.log(err);
                      res.status(500);
                      console.log('에러 발생!');
                      //res.redirect('/new_data/car');
                    } else {
                      convenienceOptionId.push(results3[0].convenience_id); // 편의옵션아이디 받아오기

                      // car_safety_option 테이블에 car_name과 safety_id을 저장하기 위한 데이터 구성
                      if(convenienceOptionId.length == convenienceOptionName.length) {
                        for(var k in safetyOptionId) {
                          safetyOptionData.push({car_name: basicCarInfo.car_name, safety_id: safetyOptionId[k]});
                        }
                        console.log('safetyOptionData', safetyOptionData);

                        // car_safety_option 테이블에 car_name과 safety_id을 저장
                        for(var k in safetyOptionId) {
                          conn.query(sqlCarSafetyOption, safetyOptionData[k], function(err, results4) {
                            if(err) {
                              console.log(err);
                              res.status(500);
                              console.log('에러 발생!');
                              //res.redirect('/new_data/car');
                            } else {
                              firstCount++;
                              // car_convenience_option 테이블에 car_name과 convenience_id을 저장하기 위한 데이터 구성
                              if(firstCount == safetyOptionId.length) {
                                for(var l in convenienceOptionId) {
                                  convenienceOptionData.push({car_name: basicCarInfo.car_name, convenience_id: convenienceOptionId[l]});
                                }
                                console.log('convenienceOptionData', convenienceOptionData);

                                // car_convenience_option 테이블에 car_name과 convenience_id을 저장
                                for(var l in convenienceOptionId) {
                                  conn.query(sqlCarConvenienceOption, convenienceOptionData[l], function(err, results5) {
                                    if(err) {
                                      console.log(err);
                                      res.status(500);
                                      console.log('에러 발생!');
                                      //res.redirect('/new_data/car');
                                    } else {
                                      secondCount++;
                                      if(secondCount == convenienceOptionId.length) {
                                        console.log('자동차-편의옵션 등록 완료!');
                                        res.redirect('/home');
                                      }
                                    }
                                  });
                                }
                              }
                            }
                          });
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        }
      }
    });
  });


/////////////////////////지역정보 등록/////////////////////////
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


/////////////////////////안전옵션 등록/////////////////////////
  route.get('/safety_option', function(req, res) {
    res.render('new_data/safety_option');
  });

  route.post('/safety_option', function(req, res) {
    var safety_option = {
      safety_id: req.body.safetyId,
    };

    var sql = 'INSERT INTO safety_option SET?';

    conn.query(sql, safety_option, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('이미 동일한 아이디가 있습니다!');
        res.redirect('/new_data/safety_option');
      } else {
        console.log('안전옵션 등록 완료!');
        res.redirect('/home');
      }
    });
  });


/////////////////////////편의옵션 등록/////////////////////////
  route.get('/convenience_option', function(req, res) {
    res.render('new_data/convenience_option');
  });

  route.post('/convenience_option', function(req, res) {
    var convenience_option = {
      convenience_id: req.body.convenienceId,
    };

    var sql = 'INSERT INTO convenience_option SET?';

    conn.query(sql, convenience_option, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('이미 동일한 아이디가 있습니다!');
        res.redirect('/new_data/convenience_option');
      } else {
        console.log('편의옵션 등록 완료!');
        res.redirect('/home');
      }
    });
  });


  /////////////////////////쏘카존 자동차 등록/////////////////////////
  route.get('/socar', function(req, res) {
    res.render('new_data/socar');
  });

  route.post('/socar', function(req, res) {
    var socar = {
      area_name: req.body.areaName,
      car_name: req.body.carName,
      car_num: req.body.carNum,
      nick_name: req.body.nickName,
    }

    var sql = 'INSERT INTO socar_zone_car SET?';

    conn.query(sql, socar, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500);
        console.log('에러 발생!');
        res.redirect('/new_data/socar');
      } else {
        console.log('쏘카존 차량 등록 완료!');
        res.redirect('/home');
      }
    });
  });


    /////////////////////////예약정보 등록/////////////////////////
    route.get('/rental', function(req, res) {
      res.render('new_data/rental');
    });

    route.post('/rental', function(req, res) {
      var rentalData = {
        rental_date: req.body.rentalDate,
        due_date: req.body.dueDate,
        area_name: req.body.areaName,
        car_name: req.body.carName,
        user_id: req.session.displayName,
      }

      var sqlCarNum = 'SELECT car_num FROM socar_zone_car WHERE car_name = ? and area_name = ?';

      conn.query(sqlCarNum, [rentalData.car_name, rentalData.area_name], function(err, results1) {
        if(err) {
            console.log(err);
            res.status(500);
            console.log('에러 발생!');
            //res.redirect('/reserve/car_info');
          } else {
            rentalData.car_num = results1[0].car_num;

            var sqlInsertRentalData = 'INSERT INTO rental_info SET?';

            conn.query(sqlInsertRentalData, rentalData, function(err, results2) {
              if(err) {
                  console.log(err);
                  res.status(500);
                  console.log('에러 발생!');
                  //res.redirect('/reserve/car_info');
                } else {
                  console.log('예약 성공!');
                  res.redirect('/home');
                }
            });
          }
      });
    });


  return route;
}
