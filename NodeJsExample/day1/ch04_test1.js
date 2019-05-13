var url = require('url');

var curUrl = url.parse('https://www.google.com/search?q=steve+jobs&oq=steve&aqs=chrome.1.69i57j0l5.3191j0j7&sourceid=chrome&ie=UTF-8');

var curString = url.format(curUrl);

console.log('주소 문자열 : %s',curUrl);
console.dir(curUrl);


var querystring = require('querystring');
var param = querystring.parse(curUrl.query);

console.log('요청 파라미터 중 query의 값 : %s',param.query);
console.log('원본 요청 파라미터 : %s',querystring.stringify(param));