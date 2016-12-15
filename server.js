var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = {
	port : 3000,
	ip : "10.1.70.107",
	root : "./"
};

app.use(express.static(__dirname)); // root 경로 설정
app.use(bodyParser.json());

app.get('/', function(req, res){
	console.log("1");
});

app.get('/test', function(req, res){
	console.log('a');
	res.json({name : '모닝', company : '기아자동차',
		kind : '경형 / 경차', oil : '휘발유',
		gear : '자동', max_people : 4,
		safe_options : ['에어백', '후방감지센서','블랙박스','네비게이션'],
		handy_options : ['에어컨', '열선시트', 'AUX/USB'],
		basic_pay : '3,600원 (30분)',
		drive_pay : '160원 (1km)'
	});
})

app.post('/auth/login', function (req, res){
	console.log(req.body);
	console.log("1");
	res.send('12');
});

app.post('/post', function(req, res){
	res.json(req.body);
});

app.get('/get', function(req, res){
	res.json({title : '힘들다', content : '진짜 힘들다.'});
});

app.listen(config.port, config.ip, function(){
	console.log("Server running on port 3000");
});