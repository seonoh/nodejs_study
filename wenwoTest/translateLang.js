// const customRequestModule = require('./netRequest.js')
const util = require('./util.js')
const axiosModule = require('axios')
const PAPAGO_CONFIG = (beforeLang, afterLang, text) => {
    let config = {
        'method': 'post',
        'url': 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
        'headers': {

            'X-NCP-APIGW-API-KEY-ID': 's49sck7gvq',
            'X-NCP-APIGW-API-KEY': 'UOQjFu6kHlzL8XTtWj6iHFg8TBD2VYf2OeYRTio0'
        },
        data: {
            'source': beforeLang,
            'target': afterLang,
            'text': text
        }
    }
    return config;
}


exports.translateLang = async (dataList, beforeLang = 'ko', afterLang = 'zh-CN') => {
    let sequence = 1;

    let translatedItemList = []
    

    // translatedItem = util.createCrawalingModel(sequence, name, addr, tag, phone, 
    //     homepage, restDate, enterCharge,
    //     parkInfo, overView)
    
    let name = ''
    let addr = ''
    let tag = ''
    let phone = ''
    let homepage = ''
    let restDate = ''
    let enterCharge = ''
    let parkInfo = ''
    let overView = ''

    for (let i = 0; i < dataList.length; i++) {

        if(i==0){

            translatedItem = util.createCrawalingModel(
            '指数', '名', '地址', '标签', '电话号码', '网站', 
            '小时/休息日', '图片', '入场费', '停车设施', '介绍')
            
        }else{
            console.log(`===================================================`)
            console.log(`Translate PROGRESS ==> ${i}/${dataList.length} ...`)
            console.log(`===================================================`)
    
    
    
            name = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].name))
            console.log(`BEFORE : ${sequence}.이름 : ${dataList[i].name}\nAFTER : ${name}`)
    
            addr = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].addr))
            console.log(`BEFORE : ${sequence}.주소 : ${dataList[i].addr}\nAFTER : ${addr}`)
    
            tag = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].tag))
            console.log(`BEFORE : ${sequence}.태그 : ${dataList[i].tag}\nAFTER : ${tag}`)
    
            phone = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].phone))
            console.log(`BEFORE : ${sequence}.전화번호 : ${dataList[i].phone}\nAFTER : ${phone}`)
    
    
            homepage = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].homepage))
            console.log(`BEFORE : ${sequence}.홈페이지 : ${dataList[i].homepage}\nAFTER : ${homepage}`)
    
            restDate = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].restDate))
            console.log(`BEFORE : ${sequence}.운영시간/휴무일 : ${dataList[i].restDate}\nAFTER : ${restDate}`)
    
            imgPath = dataList[i].imgPath
    
            enterCharge = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].enterCharge))
            console.log(`BEFORE : ${sequence}.입장료 : ${dataList[i].enterCharge}\nAFTER : ${enterCharge}`)
    
            parkInfo = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].parkInfo))
            console.log(`BEFORE : ${sequence}.주차시설 : ${dataList[i].parkInfo}\nAFTER : ${parkInfo}`)
    
            overView = await translateLangRequest(PAPAGO_CONFIG(beforeLang, afterLang, dataList[i].overView))
            console.log(`BEFORE : ${sequence}.소개 : ${dataList[i].overView}\nAFTER : ${overView}`)
    
            // console.log(`translate.. ${i}/${dataList.length}`)
            
            translatedItem = util.createCrawalingModel(sequence, name, addr, tag, phone, 
                homepage, restDate,imgPath, enterCharge,
                parkInfo, overView)
            sequence++
            
    
        }

        

        translatedItemList.push(translatedItem)


       
    }

    // console.log(translatedItemList)



    return translatedItemList;
}

// const validCheckTranslate = (item) => {
//     // translatedItem = util.createCrawalingModel(++i,
//     //     name,addr,tag,phone,homepage,restDate,enterCharge,
//     //     parkInfo,overView)
//     item.name = (!item.name) ? '없음' : item.name
//     item.addr = (!item.addr) ? '없음' : item.addr
//     item.tag = (!item.tag) ? '없음' : item.tag
//     item.phone = (!item.phone) ? '없음' : item.phone
//     item.homepage = (!item.homepage) ? '없음' : item.homepage
//     item.restDate = (!item.restDate) ? '없음' : item.restDate
//     item.enterCharge = (!item.enterCharge) ? '없음' : item.enterCharge
//     item.parkInfo = (!item.parkInfo) ? '없음' : item.parkInfo
//     item.overView = (!item.overView) ? '없음' : item.overView

//     return item

// }

const translateLangRequest = async (config) => {
    if (config['data']['text'] == '' || config['data']['text'] == null || config['data']['text'] == undefined) {
        return ''
    }
    let result = ''

    try {
        result = await axiosModule(config)
        // console.log(result)

    } catch (err) {

        console.log(err)
        return config['data']['text']


    }

    if (result['data']['message'] != undefined) {
        if (result['data']['message']['result'] != undefined) {
            if (result['data']['message']['result']['translatedText'] != undefined) {
                return result['data']['message']['result']['translatedText'];

            }
        }
    }

    return ''

}

