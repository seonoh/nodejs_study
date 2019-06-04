let koreaVisitCrawalingModule = require('../day9/koreaVisitCrawaling.js')
// let gangwonCrawalingModule = require('../day14/GangwonCrawaling.js')
let koreaVisitData = []
// let gangwonData = []

let util = require('../util.js')
let customRequestModule = require('../netRequest.js')



const startLoadData = async () => {
    koreaVisitData = await koreaVisitCrawalingModule.startKoreaVisitCrawaling()

    // gangwonData = await gangwonCrawalingModule.startTask()
}

const startTranslateLang = async () => {
    console.log(`한국관관공사 CNT : ${koreaVisitData.length}`)

    let translateResult = ''
    for(let i = 0; i<koreaVisitData.length; i++){

        

        try{
            translateResult  = await util.translateLang('ko','zh-CN',koreaVisitData[i].name)
        }catch(err){
            console.log(err)
        }
        
    }

}

const startTask = async () => {
    await startLoadData()
    await startTranslateLang()

}

startTask()

