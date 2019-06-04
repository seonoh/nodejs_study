//이름, 주소, 연락처, 홈페이지, 태그
let axiosModule = require('axios')
let cheerioModule = require('cheerio');
let jejuTotalCnt = ''
let util = require('../util.js')
let curSequence = 1;
let customRequest = require('../netRequest.js')

let jejuResulItemtList = [];
const INIT_ITEM = util.createCrawalingModel('인덱스', '이름', '주소', '태그', '전화번호', '홈페이지', '운영시간/휴무일', '이미지', '입장료', '주차시설', '소개\n')
jejuResulItemtList.push(INIT_ITEM)


const JEJU_MAIN_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=mobile&cate1cd=cate0000000002&sorting=likecnt+desc&region2cd=&pageSize=6&page=1'
const JEJU_FOOD_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000005&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'
const JEJU_LODGMENT_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000004&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'
const JEJU_SHOPPING_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000003&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'


let JEJU_CONFIG = (url)=>{

    let config = {
        'url':url,
        'method':'get',
        'headers': {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'Content-type': 'application/json;charset=UTF-8',
            'Cookie' : 'iceJWT=SDP+eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBbm9ueW1vdXMiLCJhdWQiOiI3ZWEzYTI3Mi1hODM5LTRhMjgtYTRiMy0zZWUwM2IzNmYzYTIiLCJqdGkiOiI3ZWEzYTI3Mi1hODM5LTRhMjgtYTRiMy0zZWUwM2IzNmYzYTIiLCJpc3MiOiJJLU9OIiwiaWF0IjoxNTU5NjMwNTMzLCJleHAiOjE1NTk3Mzg1MzN9.UVMePGriXZRf7ZxIC60xdRR7E1DdW4VfsIsQKtTHossjGoSwsxZuQo99n7kTYCr64YnW4mesY88vHTx52DmVGA'
        }
    }
    return config;
    
}

//제주 관광정보 페이지 수
const getJeJuPageCnt = async (url) => {
    let pageResult = '';


    try {
        pageResult = await axiosModule(await JEJU_CONFIG(url))

    } catch (err) {
        console.log(`getJeJuPageCnt ERROR --->> ${err}`)
    }


    jejuTotalCnt = pageResult['data']['totalCount'];
    return jejuTotalCnt;


}

//제주 관광정보
const getJeJuData = async (totalCnt,curUrl) => {
    let jejuResult = '';
    let useUrl = curUrl.replace(/pageSize=\d*/,`pageSize=${totalCnt}`)

    console.log(`TOTAL_COUNT : ${totalCnt}`)

    try {
        jejuResult = await axiosModule(JEJU_CONFIG(useUrl))

    } catch (err) {
        console.log(`getJeJuData ERROR --->> ${err}`)
        console.log(`getJeJuData retry...`)


    }
    let jejuDataList = jejuResult['data']['items']

    for(var i=0; i<jejuDataList.length; i++){
        let imgPath = ''
        try{
            if(jejuDataList[i].repPhoto['photoid'] != null){
                if(jejuDataList[i].repPhoto['photoid']['imgpath'] != null){
                    imgPath = jejuDataList[i].repPhoto['photoid']['imgpath']
                }
            }
        }catch(err){
            imgPath = ''
        }
        
        
        
            let item = util.createCrawalingModel(
                `${curSequence}`,
                jejuDataList[i].title,
                jejuDataList[i].address,
                jejuDataList[i].tag,
                jejuDataList[i].phoneno,
                '',
                '',
                imgPath,
                '',
                '',
                jejuDataList[i].sbst //overview
            ) 
        
        jejuResulItemtList.push(item)

        curSequence++;

    }





}

exports.startJeJuCrawaling = async() => {
    // start = new Date().getTime(); 
    await getJeJuData(await getJeJuPageCnt(JEJU_MAIN_URL),JEJU_MAIN_URL)
    await getJeJuData(await getJeJuPageCnt(JEJU_FOOD_URL),JEJU_FOOD_URL)
    await getJeJuData(await getJeJuPageCnt(JEJU_LODGMENT_URL),JEJU_LODGMENT_URL)
    await getJeJuData(await getJeJuPageCnt(JEJU_SHOPPING_URL),JEJU_SHOPPING_URL)
    // util.calcurlateTime(start,'크롤링')
    console.log(jejuResulItemtList)
    // await util.writeData('제주여행정보중국어버전',jejuResulItemtList)
    return jejuResulItemtList

    // util.writeData("제주여행정보",jejuResulItemtList)
    // util.calcurlateTime(start2,'엑셀 작업')
    // util.calcurlateTime(start,'총 작업')

}

this.startJeJuCrawaling()

