var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello, socar!');
});

app.listen(3000, function() {
  console.log('The connection with the server succeeded!');
});
