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

// function loop(){
//     for(var i=1; i<100; i++){
//         delay(i);
//     }
// }

// function delay(number){
//     setTimeout(function(){console.log(number)},number*1000);
// }

// loop();


    
// function getSecond(i,callback){
//     setTimeout(function(){
//         console.log(i);

//         if(i>10){
//             callback();
//         }else{
//             getSecond(++i,callback);
//         }
//     },1000);
// }

// getSecond(1,function(){

//     console.log('end');
// });


var request = require("request");
    
function cntUp(num,callback){
    request("https://linkareer.com/activity/22113",function(err,res){
        console.log(num + " -->>>  STATUS CODE : " + res.statusCode);

        if(num>5){
            callback();
        }else{
            cntUp(++num,callback);
        }
    })

}

cntUp(1,function(){
    console.log('complete!!');
});














