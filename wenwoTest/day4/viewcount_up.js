// var request = require("request");
// let cnt = 0;
// for (let i = 0; i < 100; i++) {
//     ++cnt;
//     request("https://linkareer.com/activity/22113")
//         .on('response', function (response) {
//             console.log(i + " -->>>  STATUS CODE : " + response.statusCode);
//         })
//         .on('error', function (err) {
//             console.log(i + " --->>>   ERROR MSG : " + err);
//         })
// }

// setTimeout(function(){console.log(1)},1000);
// setTimeout(function(){console.log(2)},2000);

function loop(){
    for(var i=1; i<100; i++){
        delay(i);
    }
}

function delay(number){
    setTimeout(function(){console.log(number)},number*1000);
}

loop();












