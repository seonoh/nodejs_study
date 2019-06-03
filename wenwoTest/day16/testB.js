const timeout = ()=>{
   
}

const startTask = async() => {
    for(let i=0; i<5; i++){
       await setTimeout(()=>{
            console.log(`B => ${i}번째 출력`)
        },i*1000)
    }
}

startTask()
