
let i = 1;


let asyncFunctionOne = (msg) => new Promise((resolve) => {
    ++i;
    setTimeout(()=>{
        console.log(`asyncFunctionOne execute !!`,msg);
        if(i<6){
            asyncFunctionOne(`${i} ==>> asyncFunctionOne execute `);
        }else{
            resolve(`asyncFunctionOne 11111111`);
        }
        
    },1000)
}).then((msg)=>{
    console.log("COMPLETE !!");
});

// let asyncFunctionTwo = (msg) => new Promise((resolve) => {
//     setTimeout(()=>{
//         console.log(`asyncFunctionTwo execute !!`,msg);
//         resolve(`asyncFunctionTwo 22222222`);
//     },500)
// });

async function asyncMain() {
    let result = await asyncFunctionOne('First asyncFunctionOne execute !!');
    console.log(`${result}`);

    result = await asyncFunctionTwo('WORLD !!');
    console.log(`${result}`);
}


asyncMain();


