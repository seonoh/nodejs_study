let customRequestModule = require('../netRequest.js')
let axiosModule = require('axios')
const PAPAGO_URL = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation'

// const papago_config

const startPapagoTranslate = async () => {
    let translateResult = ''
    try {
        translateResult = await customRequestModule.translateLangRequest(
            {
                'url': PAPAGO_URL,

                method: 'post',
                data: {
                    source: 'en',
                    target: 'zh-CN',
                    text: 'Hello'
                },

                headers: {

                    'X-NCP-APIGW-API-KEY-ID': 's49sck7gvq',
                    'X-NCP-APIGW-API-KEY': 'UOQjFu6kHlzL8XTtWj6iHFg8TBD2VYf2OeYRTio0'
                }
            }
        )
        
        console.log("RESULT === >>> " + translateResult['message']['result']['translatedText'])

    } catch (err) {
        console.log("ERROR === >>> " + err)
    }



 
}

startPapagoTranslate()
