var fs = require('fs');

fs.writeFile('./output.csv', "1.asdasdas 2.asdasdsa\n1.@#@#@#@# 2.(()*)*) \n1. ???SDKJSDH 2.??????", function(err){
    if(err){
        console.log('Error : '+err);
    }
    
    
    console.log('output.csv 파일에 데이터 쓰기 완료.');
});