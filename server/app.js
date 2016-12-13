var app = require('./config/express')();
var home = require('./routes/home')(app);
var auth = require('./routes/auth')(app);
var new_data = require('./routes/new_data')(app);

app.use('/', home);
app.use('/auth', auth);
app.use('/new_data', new_data);

app.get('/', function(req, res) {
  res.send('Hello, socar!');
});

app.listen(3000, function() {
  console.log('The connection with the server succeeded!');
});
