
let i = 1;



let asyncFunctionOne = (num) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(`${num} second...`)
    }, 1000);
}).then((msg) => {
    console.log(msg);
    ;
});

// let asyncFunctionTwo = (msg) => new Promise((resolve) => {
//     setTimeout(()=>{
//         console.log(`asyncFunctionTwo execute !!`,msg);
//         resolve(`asyncFunctionTwo 22222222`);
//     },500)
// });

async function asyncMain() {
    // let result = await asyncFunctionOne('First asyncFunctionOne execute !!');

    for (let k = 1; k <= 1001; k++) {
        let result =  await asyncFunctionOne(k);
    }
    

    // result = await asyncFunctionTwo('WORLD !!');
    // console.log(`${result}`);
}


asyncMain();


