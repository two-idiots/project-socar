var app = require('./config/express')();
var auth = require('./routes/auth')(app);

app.use('/auth', auth);

app.get('/', function(req, res) {
  res.send('Hello, socar!');
});

app.listen(3000, function() {
  console.log('The connection with the server succeeded!');
});
