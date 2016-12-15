var app = require('./config/express')();
var home = require('./routes/home')(app);
var auth = require('./routes/auth')(app);
var option = require('./routes/option')(app);
var new_data = require('./routes/new_data')(app);
var show_info = require('./routes/show_info')(app);
var fs = require('fs');

app.use('/', home);
app.use('/', option);
app.use('/auth', auth);
app.use('/new_data', new_data);
app.use('/reserve', show_info);

app.get('/', function(req, res) {
  res.send('Hello, socar!');
});

app.get('/main', function(req, res) {
  fs.readFile('../client/views/mainTest.html', function(err, data) {
    if(err) {
      console.log(err);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

app.get('/test', function(req, res){
  res.json({'car_num' : '부산 허 1588', 'car_kind' : '티코'});
});

app.listen(3000, function() {
  console.log('The connection with the server succeeded!');
});
