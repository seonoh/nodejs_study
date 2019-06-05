//엑셀 양식에 맞춰 넣기 위해 정규식을 사용하여 문자열 대체
const REGEXP = /\t|,|\n|\r|;|\\|&nbsp|'|"|(<([^>]+)>)/gi
const TAG_REGEXP = /\/|,|\.|\|#*/gi
const customRequestModule = require('../wenwoTest/netRequest.js')
// const TEL_REGEXP = /\/|' '|,/gi


exports.calcurlateTime = (startTime, msg) => {
    let elapsed = new Date().getTime() - startTime;

    if (elapsed / 1000 > 60) {
        minute = Math.round(elapsed / 1000 / 60)
        elapsed = elapsed / 1000 % 60
    } else {
        minute = 0;
    }
    console.log(`========================================================================================================`);
    console.log(`${msg} 소요 시간 : ${minute}분 ${(elapsed / 1000).toFixed(2)}초`);
    console.log(`========================================================================================================`);
}

//엑셀 파일로 저장
exports.writeData = async (fileName, itemList) => {
    var fs = require('fs');
    var result = ''

    for (var i = 0; i < itemList.length; i++) {
        result += itemList[i].sequence + "," + itemList[i].name + "," + itemList[i].addr + "," + itemList[i].tag
            + "," + itemList[i].phone + "," + itemList[i].homepage + "," + itemList[i].restDate + "," + itemList[i].imgPath + "," + itemList[i].enterCharge + "," + itemList[i].parkInfo + "," + itemList[i].overView + "\n"
    }

    // console.log(result)

    await fs.writeFile(`./${fileName}.csv`, result, async function (err) {
        if (err) {
            await console.log(err)
        } else {
            await console.log(`${fileName}.csv is writed!!!`)
        }
    })
}



//엑셀 양식별 저장을 위한 문자열 유효성 검사.
const itemValidCheck = (attr, type = 'default') => {
    try {

        if (attr == 'null') {
            attr = ''
            return attr;
        }else if(attr == null){
            attr = ''
            return attr;
        }else if (typeof (attr) == 'undefined') {
            attr = ''
            return attr;
        }else if (attr == 'undefined'){
            attr = ''
            return attr;
        }

        if (type == 'tag') {

                if (typeof (attr) == 'string') {
                    if (attr.trim() == '') {
                        attr = ''
                    } else {
                        attr = attr.trim()
                        attr = `#${attr.replace(TAG_REGEXP, "#")}`
                        attr = attr.replace("##",'#')
                    }
                } else {
                    attr = ''
                }
                return attr;
            
        
        } else if (type == 'tel') {


            if (typeof (attr) == 'string') {

                if (attr == '--') {
                    attr = ''
                }

                if (attr[0] == '-') {
                    attr = `(+82)${attr}`
                }

                attr = attr.replace(REGEXP, "")
                return attr
            }else{
                return ''
            }

            return attr;


        } else {
            if (typeof (attr) == 'object') {
                return ''
            } else if (typeof (attr) == 'number') {
                attr = "" + attr
                return attr;
            } else {
                if (attr == '') {
                    return ''
                } else {
                    if (typeof (attr) == 'string') {
                        attr = attr.replace(REGEXP, "")
                        return attr;
                    }
                }
            }
        }
    } catch (err) {
        attr = '';
        console.log(`attr : ${attr} type : ${typeof (attr)} ERROR !!!\n${err}`)
        return attr;
    }

    return attr;
}





// exports.translateLang = async (beforeLang,afterLang,text)=>{

//     let result = ''

//     try{
//         result = await customRequestModule.translateLangRequest(PAPAGO_CONFIG(beforeLang,afterLang,text))
//     }catch(err){
//         console.log(`TRANSLATE LANG ERROR ===>${err}`)
//     }

//     console.log(`BEFORE : ${text}\nAFTER : ${result['message']['result']['translatedText']}`)
//     console.log(`====================================================`)
    
//     return result['message']['tex']['translatedText'];
// }

// 여행지이름, 주소, 태그,전화번호, 홈페이지, 영업일, 이미지, 소개
exports.createCrawalingModel = (sequence, name, addr, tag, phone, homepage,
     restDate, imgPath, enterCharge, parkInfo, overView) => {
    let model = new Object()
    model.sequence = itemValidCheck(sequence)
    model.name = itemValidCheck(name)
    model.addr = itemValidCheck(addr)
    if(sequence == '인덱스'){

        model.tag = itemValidCheck(tag, 'tag')
        model.tag = model.tag.replace(/#/gi,"")
    }else{
        model.tag = itemValidCheck(tag, 'tag')

    }
    model.phone = itemValidCheck(`${phone}`, 'tel')
    model.homepage = itemValidCheck(homepage)
    model.restDate = itemValidCheck(restDate)
    model.imgPath = itemValidCheck(imgPath)
    model.enterCharge = itemValidCheck(enterCharge)
    model.parkInfo = itemValidCheck(parkInfo)
    model.overView = itemValidCheck(overView)

    return model;
}
