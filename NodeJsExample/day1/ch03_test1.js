var Person = {};
Person.age = 20;
Person.name = 'seonoh';

console.log("Person age : "+Person.age+" Person name : "+Person.name);


var Users = [{name : '소녀시대', age : 20},{name : '레드벨벳',age : 15}];



Users.push({age : 20,name:'원더걸스'});
console.log('\n');
console.log('배열 사이즈 : '+Users.length);
for(var i=0; i<Users.length; i++){
   console.log(Users[i].name+' , '+Users[i].age);
}

Users.pop();
console.log('\n');
console.log('배열 사이즈 : '+Users.length);
for(var i=0; i<Users.length; i++){
   console.log(Users[i].name+' , '+Users[i].age);
}

Users.shift();
console.log('\n');
console.log('배열 사이즈 : '+Users.length);
for(var i=0; i<Users.length; i++){
   console.log(Users[i].name+' , '+Users[i].age);
}


Users.unshift({name:'트와이스',age:18});
console.log('\n');
console.log('배열 사이즈 : '+Users.length);
for(var i=0; i<Users.length; i++){
   console.log(Users[i].name+' , '+Users[i].age);
}

Users.push({age : 20,name:'원더걸스1'});
Users.push({age : 20,name:'원더걸스2'});
Users.push({age : 20,name:'원더걸스3'});

for(var i=0; i<Users.length; i++){
   console.log(Users[i].name+' , '+Users[i].age);
}
console.log('\n');
console.log('배열 사이즈 : '+Users.length);


//delete Users[4];
//console.log('\n');
//console.log('delete 배열 사이즈 : '+Users.length);
//console.dir(Users);

Users.splice(2,2)
console.log('\n');
console.log('splice 배열 사이즈 : '+Users.length);
console.dir(Users);
for(var i=0; i<Users.length; i++){
   console.log(Users[i].name+' , '+Users[i].age);
}

callback(result)

var Users2 = Users.slice(2);
console.dir(Users2);




