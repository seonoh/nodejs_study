


let asyncFunctionOne = (msg) => new Promise((resolve) => {
    setTimeout(()=>{
        console.log(`asyncFunctionOne execute !!`,msg);
        resolve(`asyncFunctionOne 11111111`);
    },1000)
});

let asyncFunctionTwo = (msg) => new Promise((resolve) => {
    setTimeout(()=>{
        console.log(`asyncFunctionTwo execute !!`,msg);
        resolve(`asyncFunctionTwo 22222222`);
    },500)
});

async function asyncMain() {
    let result = await asyncFunctionOne('HELLO');
    console.log(`${result}`);

    result = await asyncFunctionTwo('WORLD !!');
    console.log(`${result}`);
}


asyncMain();


