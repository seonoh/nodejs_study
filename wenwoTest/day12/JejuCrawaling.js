//이름, 주소, 연락처, 홈페이지, 태그
let axiosModule = require('axios')
let cheerioModule = require('cheerio');
let jejuTotalCnt = ''
let util = require('./util.js')
let curSequence = 0;

let jejuResulItemtList = [];


const JEJU_MAIN_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000002&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'
const JEJU_FOOD_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000005&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'
const JEJU_LODGMENT_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000004&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'
const JEJU_SHOPPING_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=pc&cate1cd=cate0000000003&sorting=reviewcnt+desc,+title_kr+asc&region2cd=&pageSize=6&page=1'
const JEJU_CONFIG = {

    'headers': {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'Content-type': 'application/json;charset=UTF-8',
        'Cookie' : "iceJWT=SDP+eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBbm9ueW1vdXMiLCJhdWQiOiIzODUzMmZiMC0wMTdhLTRhYzctYWM0YS1hNTI2ZGMxMTdhNGEiLCJqdGkiOiIzODUzMmZiMC0wMTdhLTRhYzctYWM0YS1hNTI2ZGMxMTdhNGEiLCJpc3MiOiJJLU9OIiwiaWF0IjoxNTU5MDI4NTI5LCJleHAiOjE1NTkxMzY1Mjl9.zcjXoXwNaOHZaeVw3QSWVWHu7TJKPMO2hUk1jQLCmRD9qrmBG4T1Jm47H5RVIZknwdr2YqjOd_B-d8fKelmgxg;"

    }
}

//제주 관광정보 페이지 수
const getJeJuPageCnt = async (url) => {
    let pageResult = '';

    try {
        pageResult = await axiosModule.get(url,JEJU_CONFIG)

    } catch (err) {
        console.log(`getJeJuPageCnt ERROR --->> ${err}`)
        console.log(`getJeJuPageCnt retry...`)
        getJeJuPageCnt(url)
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
        jejuResult = await axiosModule.get(useUrl,
        JEJU_CONFIG)

    } catch (err) {
        console.log(`getJeJuData ERROR --->> ${err}`)
        console.log(`getJeJuData retry...`)
        getJeJuData(totalCnt,curUrl)

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
        
        
        let item = ''
        if(curSequence == 0){
            item = util.createCrawalingModel('인덱스','이름','주소','태그','전화번호','홈페이지','운영시간/휴무일','이미지','소개\n')
            
        }else{
            item = util.createCrawalingModel(
                `${curSequence}`,
                jejuDataList[i].title,
                jejuDataList[i].address,
                jejuDataList[i].tag,
                jejuDataList[i].phoneno,
                ' ',
                ' ',
                imgPath,
                jejuDataList[i].sbst
            ) 
        }
        curSequence++;

        jejuResulItemtList.push(item)
        

        // console.log(item)
    }





}

const startCrawaling = async() => {
    start = new Date().getTime(); 
    await getJeJuData(await getJeJuPageCnt(JEJU_MAIN_URL),JEJU_MAIN_URL)
    await getJeJuData(await getJeJuPageCnt(JEJU_FOOD_URL),JEJU_FOOD_URL)
    await getJeJuData(await getJeJuPageCnt(JEJU_LODGMENT_URL),JEJU_LODGMENT_URL)
    await getJeJuData(await getJeJuPageCnt(JEJU_SHOPPING_URL),JEJU_SHOPPING_URL)
    util.calcurlateTime(start,'크롤링')
    start2 = new Date().getTime();
    util.writeData("제주여행정보",jejuResulItemtList)
    util.calcurlateTime(start2,'엑셀 작업')
    util.calcurlateTime(start,'총 작업')

}

startCrawaling()

