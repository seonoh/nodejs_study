let koreaVisitCrawalingModule = require('../day9/koreaVisitCrawaling.js')
let gangwonCrawalingModule = require('../day14/GangwonCrawaling.js')
let koreaVisitData = []
let gangwonData = []

let matchCnt = 1;

const startLoadData = async () => {
    koreaVisitData = await koreaVisitCrawalingModule.startKoreaVisitCrawaling()

    gangwonData = await gangwonCrawalingModule.startTask()
}

const startCompareData = async () => {
    for (let i = 0; i < koreaVisitData.length; i++) {
        for (let j = 0; j < gangwonData.length; j++) {
            if(koreaVisitData[i].name.includes(gangwonData[j].name)){
                console.log(`한국관광공사 : ${koreaVisitData[i].sequence} : ${koreaVisitData[i].name}  강원 : ${gangwonData[j].sequence} : ${gangwonData[j].name} ${matchCnt++}번 일치 @@@@#@#@#@#@#@##@#@@@`)
            }else{
                console.log(`한국관광공사 : ${koreaVisitData[i].sequence} : ${koreaVisitData[i].name}  강원 : ${gangwonData[j].sequence} : ${gangwonData[j].name} 불일치 `)

            }
        }
    }
}

const startTask = async () => {
    await startLoadData()
    await startCompareData()
}

startTask()

