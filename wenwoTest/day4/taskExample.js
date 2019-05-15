// var request = require('request');
// const cluster = require('cluster');
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

function requestHttp(id,callback){
    request("https://linkareer.com/activity/22113",function(err,res){
        console.log("id",id);
        callback("id : "+id+" STATUS_CODE ---->>> "+res.statusCode);
        requestHttp(id,callback);

    });

}


    requestHttp("1",function(msg){
        console.log(msg);
    });

    requestHttp("2",function(msg){
        console.log(msg);
    });

    requestHttp("3",function(msg){
        console.log(msg);
    });

   


