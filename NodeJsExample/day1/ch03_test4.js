function test(a,b,callback){
    
    var result = a + b;
    callback(result);
    
    var cnt = 0;
    
    var testResult = function testResult(){
        ++cnt;
        console.log('a : '+a+' , '+'b : '+b);
        console.log('testResult %s 번 호출',cnt);
        return '횟수 : '+cnt+' // '+a+' + '+b+ ' = '+ result;
    };
    
    return testResult;
}

var testApply = test(01,12,function(result){
    console.log('testApply 실행')
});

var testApply2 = test(123,1234,function(result){
    console.log('testApply2 실행')
});

console.log(testApply());
console.log(testApply2());
console.log(testApply());
console.log(testApply2());