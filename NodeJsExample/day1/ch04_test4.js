var fs = require('fs');

fs.writeFile('./output.txt', "Hello World !! My name is Seonoh please close the file", function(err){
    if(err){
        console.log('Error : '+err);
    }
    
    
    console.log('output.txt 파일에 데이터 쓰기 완료.');
});