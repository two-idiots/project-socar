var app = require('./config/express')();
var home = require('./routes/home')(app);
var auth = require('./routes/auth')(app);

app.use('/', home);
app.use('/auth', auth);

app.get('/', function(req, res) {
  res.send('Hello, socar!');
});

app.listen(3000, function() {
  console.log('The connection with the server succeeded!');
});
