var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

//express에서 사용할 views를 ~/현재위치/views 설정
app.set('views', __dirname + '/views');

//express view engine을 ejs 설정
app.set('view engine', 'ejs');

//html을 ejs로 사용하겠다.
app.engine('html', require('ejs').renderFile);


//3000번 포트를 열어두고 응답을 기다릴 것이다.
var server = app.listen(3000, function(){
 console.log("Express server has started on port 3000")
});

//이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하기 위해 Express의 기본 제공 미들웨어 함수인 express.static 사용.
app.use(express.static('public'));

//request body를 json 형식으로 변환해 줄 수 있는 npm 모듈.
app.use(bodyParser.json());

//자동으로 req에 body 속성이 추가되고 저장된다. 
app.use(bodyParser.urlencoded());


var router = require('./router/main')(app, fs);