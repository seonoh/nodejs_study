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


/*
session
*/

// 첫째, 각 사용자(PC)들에게 고유한 ID값을 부여함으로서 각 클라이언트에 맞는 서비스를 제공할 수 있다.
// 두 번째, 사용한 사용자의 정보들을 서버에만 저장하기 때문에 보안면에서 쿠키만을 사용하는 것보다 훨씬 우수. 
// 이러한 보안성으로 인해 로그인과 같은 사용자들의 중요 정보를 다루는 처리들은 주로 세션을 이용. 

// 반면에 세션의 단점은 데이터 처리를 위한 서버의 부하와 저장공간이 필요.

app.use(session({
 secret: '@#@$MYSIGN#@$#$', //keyboard cat(랜덤값)
 resave: false, //resave 요청하는 동안 수정이 없다 하더라도 세션은 세션저장곤간에 강제적으로 다시 저장될 것.
 saveUninitialized: true //초기화되지 않은채 스토어에 저장되는 세션.
}));

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var router = require('./router/main')(app, fs);