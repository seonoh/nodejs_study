let i = 1;

var _promise = function(param){


    return new Promise(function(resolve, reject){

        setTimeout(function(){
            if(param) {


                if(i<=5){
                    console.log(`${i} second..`)
                    i++;
                    _promise(true);
                }else{
                    console.log(`complete !!`);
                    // resolve(`complete !!`);

                }
                
            } else {
                reject("failed !!");
            }

        },1000);
    });
};

_promise(true)
    .then(function(text){
        console.log(text);
    }, function(error){
        console.log(error);
    })