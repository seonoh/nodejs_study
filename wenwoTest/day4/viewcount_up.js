var request = require("request"); 
let cnt = 0;
for(let i=0; i<1000; i++) {
    ++cnt;
    request("https://linkareer.com/activity/22113")
    .on('response',function(response){
        console.log(i+" -->>>  STATUS CODE : " +response.statusCode);
    })
    .on('error',function(err){
        console.log(i+" --->>>   ERROR MSG : " +err);
    })

}

console.log("total cnt : "+cnt);







