var request = require("request");
const cluster = require('cluster');
// var numCPUs = require('os').cpus().length; // CPU 개수 가져오기

// if(cluster.isMaster){
//     for(var i=0; i<numCPUs; i++){
//         cluster.fork();
//     }

//     cluster.on('online',function(firstWorker){

//         console.log('asdasdasd',firstWorker.process.pid);
//     })
// }else{
//     console.log('@#@#@#');
// }

// var firstWorker = cluster.fork();
// var secondWorker = cluster.fork();
// var thirdWorker = cluster.fork();

var request = require('request');
var requestCnt = 0;

function requestHttp(id,callback){
    ++requestCnt;

    if(requestCnt<101){
        request("https://linkareer.com/activity/22113",function(err,res){
            `요청횟수 : ${requestCnt} id : ${id}`
            callback("요청횟수 : "+(requestCnt)+" id : "+id+" STATUS_CODE ---->>> "+res.statusCode);
            callback("요청횟수 : "+(requestCnt)+" id : "+id+" STATUS_CODE ---->>> "+res.statusCode);
            requestHttp(id,callback);
        });
    }
}

function startRequest(id){
    requestHttp(id,function(msg){
            console.log(msg);
    });
}

startRequest(1);
console.log('cnt',requestCnt);
startRequest(2);
startRequest(3);

    // requestHttp("1",function(msg){
    //     if(requestCnt<101){
    //         console.log(msg);
    //     }
        

    // });

    // requestHttp("2",function(msg){
    //     if(requestCnt<101){
    //         console.log(msg);
    //     }

    // });

    // requestHttp("3",function(msg){
    //     if(requestCnt<101){
    //         console.log(msg);
    //     }
        
    // });

   


