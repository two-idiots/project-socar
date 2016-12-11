var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = {
	port : 3000,
	ip : "10.1.70.107",
	root : "./"
}

app.use(express.static(__dirname)); // root 경로 설정
app.use(bodyParser.json());

app.get('/', function(res, req){
	console.log("1");
});

app.post('/auth/login', function (req, res){
	console.log(req.body);
	console.log("1");
	res.send('12');
});

app.listen(config.port, config.ip, function(){
	console.log("Server running on port 3000");
});