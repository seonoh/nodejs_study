let add = (arg1, arg2) => new Promise((resolve) => {
    setTimeout(() => {
        console.log('add executed');
        resolve({ result: arg1 + arg2 });
    }, 1000);
});

let sub = (arg1, arg2) => new Promise((resolve) => {
    setTimeout(() => {  
        console.log('sub executed');
        resolve({ result: arg1 - arg2 });
    }, 500);
});

add(1,2).then((value)=>sub(3,4))
        .then((value)=>{
            console.log(value);
        });

let test = '';

console.log(`${{test : (1+2)}}`);


add(1, 2);
sub(3, 4);

// var materials = [
//     'Hydrogen',
//     'Helium',
//     'Lithium',
//     'Beryllium'
//   ];
  
//   console.log(materials.map(material => material.length));
//   // expected output: Array [8, 6, 7, 9]
  