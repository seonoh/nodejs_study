function add(a,b,callback){
    
    var result = a+b;
    callback(result);
    
    var history = function(){
        return a +' + '+ b +' = '+result;
    };
    
    return history;
    
}

var add_history = add(10,10,function(result){
   console.log('파라미터로 전달된 함수 호출') 
   console.log('a + b = %s',result); 
});

console.log(add_history);


var a = 1;
var b = 2;

console.log('a++  ->'+a++);
console.log('b++  ->'+b++);
console.log('++a  ->'+(++a));
console.log('++b  ->'+(++b));