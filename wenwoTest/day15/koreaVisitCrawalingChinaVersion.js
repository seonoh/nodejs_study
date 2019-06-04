let customRequest = require('../netRequest')
let util = require('../util.js')
let cheerioModule = require('cheerio')

const KOREA_VISIT_CHINA_TOUR_MAIN_URL = 'http://chinese.visitkorea.or.kr/common_intl/mapInformation.kto?func_name=tourist&md=chs&lang_se=CHG&area_code=31&category_region=&curr_page=1&category='

let curSequence = 1;
const INIT_ITEM = util.createCrawalingModel('인덱스', '이름', '주소', '태그', '전화번호', '홈페이지', '운영시간/휴무일', '이미지', '입장료', '주차시설', '소개\n')
let koreaVisitSeoulChineseItemList = [];
koreaVisitSeoulChineseItemList.push(INIT_ITEM)

const SEOUL_AREA_CODE = 1
const INCHEON_AREA_CODE = 2

const KYEONGI_AREA_CODE = 31
const GANGWON_AREA_CODE = 32
const ULSAN_AREA_CODE = 7
const BUSAN_AREA_CODE = 6
const JEJU_AREA_CODE = 39
const GWANGJU_AREA_CODE = 5
const JEONRABUKDO_AREA_CODE = 37
const JEONRANAMDO_AREA_CODE = 38
const DAEGU_AREA_CODE = 4
const CHUNGCHEONGBUKDO_AREA_CODE = 33
const CHUNGCHEONGNAMDO_AREA_CODE = 34
const DAEJEON_AREA_CODE = 3
const KYEONGSANGBUKDO_AREA_CODE = 35
const KYEONGSANGNAMDO_AREA_CODE = 36
const SEJEONG_AREA_CODE = 8

let areaCodeList = [SEOUL_AREA_CODE,INCHEON_AREA_CODE,KYEONGI_AREA_CODE,GANGWON_AREA_CODE,ULSAN_AREA_CODE,BUSAN_AREA_CODE,JEJU_AREA_CODE,
GWANGJU_AREA_CODE,JEONRABUKDO_AREA_CODE,JEONRANAMDO_AREA_CODE,DAEGU_AREA_CODE,CHUNGCHEONGBUKDO_AREA_CODE,CHUNGCHEONGNAMDO_AREA_CODE,
DAEJEON_AREA_CODE,KYEONGSANGBUKDO_AREA_CODE,KYEONGSANGNAMDO_AREA_CODE,SEJEONG_AREA_CODE]

let useURL = ''

const KOREA_VISIT_CHINA_SHOPPING_URL = 'http://chinese.visitkorea.or.kr/chs/SHP/SH_CHG_7_5.jsp?areaCode=&sigunguCode=&keyword=&gotoPage=1&cid='
const KOREA_VISIT_CHINA_FOOD_URL = 'http://chinese.visitkorea.or.kr/chs/FOD/FO_CHG_6_3_5.jsp?areaCode=&sigunguCode=&keyword=&gotoPage=1&cid='
const KOREA_VISIT_CHINA_ACCOMDATION_URL = 'http://chinese.visitkorea.or.kr/chs/ACM/AC_CHG_4_9.jsp?areaCode=&sigunguCode=&keyword=&gotoPage=1&cid='

const getTourPageCnt = async(url,areaCode)=> {


    useURL = url.replace(/area_code=\d*/,`area_code=${areaCode}`)
    console.log('====================================================')
    console.log('요청 URL ==>  '+useURL)
    console.log('====================================================')
    let result = await customRequest.networkGetRequest(useURL)
    let ci = cheerioModule.load(result)
    let temp = ci('a.page-button.end').attr('href')
    let temp2 = ci('article>a')
    let totalCnt = temp.replace(/[^0-9]/g,'')

    if(totalCnt == 0){
        let maxPage = 0;

        for(let i=0; i<temp2.length; i++){
            if(maxPage<=ci(temp2[i]).text().replace(/[^0-9]*/g,"")){
                maxPage = await ci(temp2[i]).text().replace(/[^0-9]*/g,"")
            }
        }

        totalCnt = maxPage

    }

    console.log(`AREACODE ==>> ${areaCode} TOTAL_PAGE_COUNT ==>> ${totalCnt}`)
    return totalCnt

}

const getTourData = async(totalCnt)=>{

    for(let i=1; i<=totalCnt; i++){
        useURL = useURL.replace(/curr_page=\d*/,`curr_page=${i}`)


        let result = await customRequest.networkGetRequest(useURL)
        let ci = cheerioModule.load(result)
        let itemList = ci('body > article.board-list.area-space > table > tbody > tr')

        for(let j=0; j<itemList.length; j++){
            let href = `http://chinese.visitkorea.or.kr${ci(itemList[j]).find('a').attr('href')}`
            await getDetailData(href)
        }

    }
}

const getDetailData = async(url,tag='#한국#관광지#관광명소#여행지')=>{

    let result = await customRequest.networkGetRequest(url)
    let ci = cheerioModule.load(result)
    
    let base = ci('#contents > section.board-section > article.board-view.blog')
    let title = ci(base).find('h2').text()
    let addr = ci(base).find('div.board-content > dl > dd:nth-child(3)').text()
    let curTag = tag

    let tel = ci(base).find('div.board-content > dl > dd:nth-child(9)').text()
    let homepage = ci(base).find('div.board-content > dl > dd:nth-child(12) > a').text()
    let restDate = ''
    let imgPath = ci(base).find('div.thumnail > ul > li >a >img').attr('src')
    let enterCharge = ''
    let parkInfo = ''
    let overView = ci(base).find('div.board-content > ul > li.on > div > p').text()
    
    console.log(`${curSequence} ==>  title : ${title} tag : ${curTag}`)

    item = util.createCrawalingModel(curSequence,title,addr,curTag,tel,homepage,restDate,imgPath,enterCharge,parkInfo,overView)
    koreaVisitSeoulChineseItemList.push(item)
    curSequence++;

}

const startKoreaVisiChineseCrawaling = async()=>{
    start = new Date().getTime()
    await startTourCrawaling() 
    await startShoppingOrFoodOrAccomodationCrawaling(KOREA_VISIT_CHINA_SHOPPING_URL,'#한국#쇼핑') 
    await startShoppingOrFoodOrAccomodationCrawaling(KOREA_VISIT_CHINA_FOOD_URL,'#한국#음식')
    await startShoppingOrFoodOrAccomodationCrawaling(KOREA_VISIT_CHINA_ACCOMDATION_URL,'#한국#숙박')
    await util.writeData('한국관광공사중국어버전',koreaVisitSeoulChineseItemList)

    util.calcurlateTime(start,"한국관광공사중국어버전 크롤링")

}

const startTourCrawaling = async()=>{
    for(let i=0; i<areaCodeList.length; i++){
        
        console.log(`============================================`)
        console.log(`${i}번쨰 지역 크롤링 시작`)
        console.log(`============================================`)

        await getTourData(await getTourPageCnt(KOREA_VISIT_CHINA_TOUR_MAIN_URL,areaCodeList[i]))
    }
    

}

const getPageCnt = async(url)=>{
    let result = await customRequest.networkGetRequest(url)
    let ci = cheerioModule.load(result)
    let temp = ci('a.page-button.end').attr('href')
    let totalCnt = temp.replace(/[^0-9]/g,'')

    console.log(totalCnt)
    return totalCnt

}

const getShoppingOrFoodOrAccomodationData = async(url,tag)=>{
 let result = await customRequest.networkGetRequest(url)
            let ci = cheerioModule.load(result)
            let itemList = ci('#contents > form > section.board-section.map > article.blog-list > ul > li')

            for(let j = 0; j<itemList.length; j++){
                href = `http://chinese.visitkorea.or.kr/${ci(itemList[j]).attr('url')}`
                await getDetailData(href,tag)
            }

}

const startShoppingOrFoodOrAccomodationCrawaling = async(url,tag)=>{
    let totalCnt = await getPageCnt(url)
    let useUrl = ''

        for(let i = 1; i<=totalCnt; i++){
            console.log('==============================================')
            console.log(`${i}페이지 크롤링 시작`)
            console.log('==============================================')

            useUrl = url.replace(/gotoPage=\d*/,`gotoPage=${i}`)
            await getShoppingOrFoodOrAccomodationData(useUrl,tag)
            
        }

}

startKoreaVisiChineseCrawaling()







