let i = 1;

var promise = function(param){
    return new Promise(function(resolve, reject){

        setTimeout(function(){
            if(param) {

                if(i<=10){
                    console.log(`${i++} second ..`);
                    promise(true);
                }else{
                    resolve(`${i++} second ..`);
                
                }
                
            } else{
                reject("failed !!");
            } 
        },1000);

    });
};

promise(true)
    .then(function(text){

        console.log(text);

        promise(true);

    }, function(error){
        console.log(error);
    })