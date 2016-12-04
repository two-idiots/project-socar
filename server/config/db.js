module.exports = function() {
  var mysql = require('mysql');
  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'socar'
  });
  conn.connect();

  return conn;
}
