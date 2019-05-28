//엑셀 양식에 맞춰 넣기 위해 정규식을 사용하여 문자열 대체
const REGEXP = /,|\n|\r|;|\\|&nbsp|'|"|(<([^>]+)>)/gi
const TAG_REGEXP = /,/gi
exports.calcurlateTime = (startTime)=>{
    let elapsed = new Date().getTime() - startTime;

    if (elapsed / 1000 > 60) {
        minute = Math.round(elapsed / 1000 / 60)
        elapsed = elapsed / 1000 % 60
    } else {
        minute = 0;
    }

    console.log(`크롤링 소요 시간 : ${minute}분 ${(elapsed / 1000).toFixed(2)}초`);
}

//엑셀 파일로 저장
exports.writeData = async(fileName,itemList)=>{
    var fs = require('fs');
    var result = ''

    for(var i=0; i<itemList.length; i++){

        result += itemList[i].name + "," + itemList[i].addr + "," + itemList[i].tag 
        + "," + itemList[i].phone + "," + itemList[i].homepage + "," +" "+","+ itemList[i].imgPath + "," + itemList[i].overView + "\n"
    }

    await fs.writeFile(`./${fileName}.csv`, result, async function (err) {
        if (err) {
            await console.log(err)
        } else {
            await console.log(`${fileName}.csv is writed!!!`)
        }
    })
}

//엑셀 양식별 저장을 위한 문자열 유효성 검사.
const itemValidCheck = (attr,type='default') => {
    if(type == 'tag'){
        if(typeof(attr) == 'undefined'){
            attr = ''
        }else{
            
            attr = attr.replace(REGEXP,"#")
        }
    }else{
        if(typeof(attr) == 'undefined'){
            attr = ''
        }else{
            if(attr == ''){
                return ''
            }
            // console.log(typeof(attr))
            attr = attr.replace(REGEXP,"")
        }
    }
    
    return attr;
}

// 여행지이름, 주소, 태그,전화번호, 홈페이지, 영업일, 이미지, 소개
exports.createCrawalingModel = (sequence, name, addr, tag, phone, homepage, restDate, imgPath, overView) => {
        let model = new Object()
        model.name = `${sequence}.${itemValidCheck(name)}`
        model.addr = itemValidCheck(addr)
        model.tag = itemValidCheck(tag,'tag')
        model.phone = itemValidCheck(phone)
        model.homepage = itemValidCheck(homepage)
        model.restDate = itemValidCheck(restDate)
        model.imgPath = itemValidCheck(imgPath)
        model.overView = itemValidCheck(overView)
        return model;
        }