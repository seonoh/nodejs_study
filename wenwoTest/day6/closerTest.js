
function closerTest(){

    var value = 0;

    function publicAddOneValue(){
        return (++value);
    }

    function publicAddTwoValue(){
        return (value+=2);
    }

    return { publicAddOne : publicAddOneValue, publicAddTwo : publicAddTwoValue };

}

var a = closerTest();



a.publicAddOne();
a.publicAddOne();
a.publicAddOne();
a.publicAddTwo();
a.publicAddOne(); //예상값 6

let b = closerTest();

b.publicAddTwo();
b.publicAddTwo();
b.publicAddTwo();
b.publicAddOne();
b.publicAddTwo(); //예상값 9

console.log(`a : ${a.publicAddOne()}`); // 7
console.log(`b : ${b.publicAddTwo()}`); // 11