function Person(name, age){
    this.name = name;
    this.age = age;
}


Person.prototype.walk = function(speed){
    console.log(speed+'km 속도로 걸어갑니다.');
}

var person1 = new Person('엄선오',28);
var person2 = new Person('오빛나',28);

console.log(person1.name + ' 객체의 walk(10)을 호출합니다.');
person1.walk(10);

console.log(person2.name + ' 객체의 walk(10)을 호출합니다.');
person2.walk(5);
