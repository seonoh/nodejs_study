let i = 1;


new Promise(function (resolve, reject) {

    setTimeout(() => resolve(i++), 1000);

}).then(function (num) {

    console.log(num);
    new Promise(function (resolve, reject) {

        setTimeout(() => resolve(i++), 1000);
    
    }).then(function(num){
        console.log(num);
        new Promise(function (resolve, reject) {

            setTimeout(() => resolve(i++), 1000);
        
        }).then(function(num){
            console.log(num);
            new Promise(function (resolve, reject) {

                setTimeout(() => resolve(i++), 1000);
            
            }).then(function(num){
                console.log(num);
            })
        })
    })
})