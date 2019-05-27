var text = ', \n \r ; \\ &nbsp " <a> ," ") \n\n\n안녕하세요!!\\\\\\\\\"\r\n<br  >&nbsp;asdasd;asdasd;;sadasdasd;asd'

text = text.replace(/,|\n|\r|;|\\|&nbsp|'|"|(<([^>]+)>)/gi," ")

text.replace(/!/gi,"@")

var array = ["1","2","3","4"]
// console.log(text)




function test(item){
    console.log('testArray111'+item[0])

}

function test(item){
    console.log('testArray@@@2323@'+item[0])

}



test(array)

console.log(array)