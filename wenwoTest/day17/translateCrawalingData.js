
let util = require('../util.js')
let translateModule = require('../translateLang.js')
let customRequestModule = require('../netRequest.js')

let jejuData = []
let jejuCrawalingModule = require('../day12/JejuCrawaling.js')


// let jeonjuData = []
// let jeonjuCrawalingModule = require('../day12/JeonjuCrawaling.js')

// let kyungbukData = []
// let kyungbukCrawalingModule = require('../day13/KyungbukCrawaling.js')

// let gangwonData = []
// let gangwonCrawalingModule = require('../day14/GangwonCrawaling.js')

const loadData = async()=>{
    let jejuData = await jejuCrawalingModule.startJeJuCrawaling()
    let translatedJejuData = await translateModule.translateLang(jejuData)
    await util.writeData('제주여행정보중국어버전',translatedJejuData)
    // jeonjuData = await jeonjuCrawalingModule.startJeonJuCrawaling()
    // kyungbukData = await kyungbukCrawalingModule.startKyungbukCrawaling()
    // gangwonData = await gangwonCrawalingModule.startGangwonCrawaling()
}


loadData()