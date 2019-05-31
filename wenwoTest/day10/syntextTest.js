async function csvFileWrite(text) {

    var fs = require('fs');

    await fs.writeFile(`./테스트.csv`, text, async function (err) {
        if (err) {
            await console.log(err)
        } else {
            await console.log(`PROCESS COMPLETED !!`)
        }
    })

}

csvFileWrite(` '대구 북구 문화관광 <a href="http://www.buk.daegu.kr/tour/index.do\n" target="_blank" title="새창 : 대구 북구 문화관광 홈페이지로 이동">http://www.buk.daegu.kr/tour/index.do\n</a><br />문화재청 <a href="http://www.cha.go.kr/" target="_blank" title="새창 : 문화재청 홈페이지로 이동">http://www.cha.go.kr</a>'`)