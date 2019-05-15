function Person(name,mineral){

    this.name = name;
    this.mineral = mineral;
}

Person.prototype.initMineral = function(){

    var mineral = 0;
    console.log(`prototype test mineral : ${mineral} `);
    return mineral;

}

var user_one = new Person("seonoh",0);
var user_two = new Person("bitna",0);
var user_three = new Person("yu",0);

var isResult = false;

var cnt = 0;
var earthMineral = 10;

function addMineral(remainMineral,Person, callback){
    --earthMineral;

    var randomSecond = Math.floor(Math.random()*1000)+1;
    console.log(`second : ${randomSecond}`);
    

    setTimeout(function(){
        
        Person.mineral += 1;
        console.log(`name : ${Person.name} mineral : ${Person.mineral} 남은 미네랄 : ${earthMineral}`);

            if(remainMineral < 0){
                console.log(`mineralGame winner : ${Person.name} total mineral : ${Person.mineral}`);
                callback(Person.mineral);
                
            }else{
                addMineral(earthMineral,Person,callback);
            }


    },randomSecond);
}

addMineral(earthMineral,user_one,function(totalMineral){

    console.log(`${user_one.name}님의 총 미네랄 획득량은 ${totalMineral} 입니다.`);
})

addMineral(earthMineral,user_two,function(){
    console.log(`${user_two.name}님의 총 미네랄 획득량은 ${user_two.mineral} 입니다.`);
})

addMineral(earthMineral,user_three,function(){
    console.log(`${user_three.name}님의 총 미네랄 획득량은 ${user_three.mineral} 입니다.`);
})






