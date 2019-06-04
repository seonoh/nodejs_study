// const customRequestModule = require('./netRequest.js')
const util = require('./util.js')
const axiosModule = require('axios')
const PAPAGO_CONFIG = (beforeLang,afterLang,text)=>{
    let config = {
        'method' : 'post',
        'url' : 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
        'headers':{

            'X-NCP-APIGW-API-KEY-ID' : 's49sck7gvq',
            'X-NCP-APIGW-API-KEY' : 'UOQjFu6kHlzL8XTtWj6iHFg8TBD2VYf2OeYRTio0'
        },
        data : {
            'source' : beforeLang,
            'target' : afterLang,
            'text' : text
        }
    }
    return config;
}


exports.translateLang = async (dataList,beforeLang='ko',afterLang='zh-CN')=>{


    let translatedItemList = []
    // '인덱스', '이름', '주소', '태그', '전화번호', '홈페이지', 
    // '운영시간/휴무일', '이미지', '입장료', '주차시설', '소개\n'
    for(let i=0; i<dataList.length; i++){
        // console.log(dataList[i].name)

        name = await translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].name))
        console.log(`BEFORE : ${dataList[i].name}\nAFTER : ${name}`)
        console.log(`====================================================`)

        // addr = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].addr))
        // tag = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].tag))
        // phone = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].phone))
        // homepage = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].homepage))
        // restDate = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].restDate))
        // // imgPath = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].name))
        // enterCharge = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].enterCharge))
        // parkInfo = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].parkInfo))
        // overView = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,dataList[i].overView))
        
        // item = util.createCrawalingModel(++i,name,addr,tag,phone,homepage,restDate,enterCharge,
        //     parkInfo,overView)

        // translatedItemList.push(item)
    }

    // console.log(translatedItemList)
    

    
    return translatedItemList;
}

const translateLangRequest = async (config) => {
    // console.log(config)
    let result = ''

    try {
        result = await axiosModule(config)
        // console.log(result)

    } catch (err) {

        console.log(err)

    }
    // console.log(result['data']['message'])

    return await result['data']['message']['result']['translatedText'];

}

