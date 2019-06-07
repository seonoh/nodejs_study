
let util = require('../util.js')
let translateModule = require('../translateLang.js')
let customRequestModule = require('../netRequest.js')


// let jejuCrawalingModule = require('../day12/JejuCrawaling.js')


// let jeonjuCrawalingModule = require('../day12/JeonjuCrawaling.js')


// let kyungbukCrawalingModule = require('../day13/KyungbukCrawaling.js')

// let gangwonData = []
let gangwonCrawalingModule = require('../day14/GangwonCrawaling.js')

const loadData = async()=>{
    // let jejuData = await jejuCrawalingModule.startJeJuCrawaling()
    // let translatedJejuData = await translateModule.translateLang(jejuData)
    // await util.writeData('제주여행정보중국어버전',translatedJejuData)

    // let jeonjuData = await jeonjuCrawalingModule.startJeonJuCrawaling()
    // let translatedJeonjuData = await translateModule.translateLang(jeonjuData)
    // await util.writeData('전주여행정보중국어버전',translatedJeonjuData)

    // let kyungbukData = await kyungbukCrawalingModule.startKyungbukCrawaling()
    // let translatedKyungbukData = await translateModule.translateLang(kyungbukData)
    // await util.writeData('경북여행정보중국어버전',translatedKyungbukData)

    let gangwonData = await gangwonCrawalingModule.startGangwonCrawaling()
    let translatedGangwonData = await translateModule.translateLang(gangwonData)
    await util.writeData('강원여행정보중국어버전',translatedGangwonData)


}


loadData()