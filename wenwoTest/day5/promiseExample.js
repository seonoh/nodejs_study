let i = 1;

var _promise = function (param) {
    return new Promise(function (resolve, reject) {

        setTimeout(function () {
            if (param) {


                if (i <= 5) {
                    console.log(`${i} second..`);
                    i++;
                    _promise(true).then(function(text){
                        console.log('여기요');
                    },function(error){
                        console.log(error);
                    })

                }else{
                    resolve("complete!@!@!@");
                }
               

            } else {
                reject("failed !!");
            }

        }, 1000);
    });
};

_promise(true)
    .then(function (text) {
        console.log(text);
    }, function (error) {
        console.log(error);
    })

// var _promise = Promise.resolve(function(second){
//     setTimeout(function(){

//         i++;
//         console.log(`${i} second...`);
//         _promise(i);

//     },1000)
// });

// _promise.then(function(value){
//     console.log(value)
// })