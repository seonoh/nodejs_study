
//이름, 주소, 연락처, 홈페이지, 태그
let axiosModule = require('axios')
let cheerioModule = require('cheerio');

//엑셀 양식별 저장을 위한 아이템 순서.
let item_sequence = 0;

//현재 태그 정보
let curTag = ''



//엑셀 양식에 맞춰 넣기 위해 정규식을 사용하여 문자열 대체
const REGEXP = /,|\n|\r|;|\\|&nbsp|'|"|(<([^>]+)>)/gi

//전주 메인
const JEONJU_MAIN_URL = 'http://tour.jeonju.go.kr'

//문화공간 -> 관람시설
const JEONJU_CULTURE_ONE_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f829af04c0477'
const JEONJU_CULTURE_ONE_TAG = '#전주#문화공간#관람시설'


//문화공간 -> 전통시설
const JEONJU_CULTURE_TWO_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f829e786a049a'
const JEONJU_CULTURE_TWO_TAG = '#전주#문화공간#전통시설'

//문화공간 -> 도서관
const JEONJU_CULTURE_THREE_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f82a10f9404c9'
const JEONJU_CULTURE_THREE_TAG = '#전주#문화공간#도서관'

//문화공간 -> 문화센터
const JEONJU_CULTURE_FOUR_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a753828b28015383ee21db5ad5'
const JEONJU_CULTURE_FOUR_TAG = '#전주#문화공간#문화센터'

//문화체험 -> 전통문화
const JEONJU_CULTURE_EXPERIENCE_ONE_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a753b598650153eae96c935f36'
const JEONJU_CULTURE_EXPERIENCE_ONE_TAG = '#전주#문화공간#전통문화'

//문화체험 -> 농촌마을
const JEONJU_CULTURE_EXPERIENCE_TWO_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f82a86826055d'
const JEONJU_CULTURE_EXPERIENCE_TWO_TAG = '#전주#문화공간#농촌마을'

//문화유적 -> 향토문화유산
const JEONJU_CULTURE_HERITAG_ONE_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f82b9e7c906a5&tag=%ED%96%A5%ED%86%A0%EB%AC%B8%ED%99%94%EC%9C%A0%EC%82%B0&timg=02'
const JEONJU_CULTURE_HERITAG_ONE_TAG = '#전주#문화공간#향토문화유산'

//전주 문화공간 관람시설 페이지 수 측정하는 함수.
const getJeonJuCulturePageCnt = async (jeonjuFirstUrl) => {
    let pageResult = '';

    try {
        pageResult = await axiosModule({
            'url': jeonjuFirstUrl,
            'method': 'get',
            'headers': {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (err) {
        console.log(err)
    }

    let ci = cheerioModule.load(pageResult['data'])
    //현재 위치(cur.num 제외)
    let pageList = ci('#pagingNav>a.num,a.cur_num')
    console.log(`${jeonjuFirstUrl}`)
    console.log(`PAGE == > ${pageList.length} crawaling start`)


    for (var i = 0; i < pageList.length; i++) {

        //첫 페이지의 경우 href 따로 존재않기 때문에 조건문.
        if(i == 0){
            currentUrl = jeonjuFirstUrl;
        }else{
            nextPageHref = ci(pageList[i]).attr('href')
            currentUrl = `${JEONJU_MAIN_URL}${nextPageHref}`
        }
        // console.log(currentUrl)
        await getJeonJuCultureData(currentUrl)
    }

}

//전주 문화공간 관람시설 전체 데이터 확보
const getJeonJuCultureData = async (curUrl) => {
    let cultureResult = '';

    try {
        result = await axiosModule({
            url: curUrl,
            method: 'get',

            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        let ci = cheerioModule.load(result['data'])
        let cultureItemList = ci('#image_board').find('div.image_board_list')

        // 아이템의 상세정보
        for (var i = 0; i < cultureItemList.length; i++) {
            href = ci(cultureItemList[i]).find('ul > li > ul.image_board_image > li > a').attr('href')
            // console.log(`href : ${href}`)
            await getJeonJuDetailCulture(href)
        }

    } catch (err) {
        console.log(err)
    }


}

//전주 문화공간 관람시설 각각의 상세정보 획득
const getJeonJuDetailCulture = async (href) => {
    let cultureDetailResult = '';

    try {
        cultureDetailResult = await axiosModule({
            url: `http://tour.jeonju.go.kr/${href}`,
            method: 'get',

            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (err) {
        console.log(err)
    }

    let ci = cheerioModule.load(cultureDetailResult['data'])
    let detailItem = ci('#image_board>div.image_board_detail > ul')

    let cultureItemImagePath = JEONJU_MAIN_URL+detailItem.find('li:nth-child(1) > ul > li > img').attr('src')
    let cultureItem = detailItem.find('li:nth-child(2) > ul')

    
    let cultureItemTitle = itemValidCheck(cultureItem.find('li.image_board_detail_title').text().trim())
    let cultureItemAddr = itemValidCheck(cultureItem.find('span.address~strong').text())
    let cultureItemTag = curTag
    let cultureItemTel = itemValidCheck(cultureItem.find('span.phone~strong').text())
    let cultureItemHome = itemValidCheck(cultureItem.find('span.link~strong').text())

    let cultureItemOverView = itemValidCheck((ci('#image_board > div.detail_content > div.detail_cont_txt').text()))

    
    // console.log(`title : ${cultureItemTitle}`)
    // console.log(`addr : ${cultureItemAddr}`)
    // console.log(`tag : ${cultureItemTag}`)
    // console.log(`tel : ${cultureItemTel}`)
    // console.log(`homepage : ${cultureItemHome}`)
    // console.log(`image : ${cultureItemImagePath}`)
    // console.log(`overview : ${cultureItemOverView}`)
    
    if (item_sequence == 0) {
        text = `이름,주소,태그,전화번호,홈페이지,운영시간,이미지,소개\n`
        
        item_sequence++;
    }

    text += (item_sequence++) + "." + cultureItemTitle + "," + cultureItemAddr + "," + cultureItemTag + "," + cultureItemTel + "," + cultureItemHome + "," +" "+","+ cultureItemImagePath + "," + cultureItemOverView + "\n"

    // console.log(text)
    // console.log(`================================================================================`)

}

//엑셀 양식별 저장을 위한 문자열 유효성 검사.
const itemValidCheck = (attr) => {
    if(typeof(attr) == undefined){
        attr = ''
    }else{
        attr = attr.replace(REGEXP,"")
    }
    return attr;
}

//엑셀 파일로 저장
const jeonjuItemWrite = async(text)=>{
    var fs = require('fs');

    await fs.writeFile(`./전주여행정보.csv`, text, async function (err) {
        if (err) {
            await console.log(err)
        } else {
            await console.log(`PROCESS COMPLETED !!`)
        }
    })
}

//한 탭의 크롤링 작업 시작 , 작업순서 : 페이지수 확보 -> 전체 데이터 확보 -> 상세정보 획득 -> 엑셀 파일 저장
const startJeonJuCulturePartCrawaling = async(baseURL,tag)=>{
    curTag = tag
    await getJeonJuCulturePageCnt(baseURL)
    
}

const calcurlateTime = (startTime)=>{
    let elapsed = new Date().getTime() - startTime;

    if (elapsed / 1000 > 60) {
        minute = Math.round(elapsed / 1000 / 60)
        elapsed = elapsed / 1000 % 60
    } else {
        minute = 0;
    }

    console.log(`크롤링 소요 시간 : ${minute}분 ${(elapsed / 1000).toFixed(2)}초`);
}


//전체 작업
const startCrawaling = async() => {
    start = new Date().getTime();

    //전주 문화공간 관람시설(JEONJU_CULTURE_ONE_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_ONE_URL,JEONJU_CULTURE_ONE_TAG);
    console.log("1 문화공간 관람시설 crawaling is success..\n")

    //전주 문화공간 전통시설(JEONJU_CULTURE_TWO_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_TWO_URL,JEONJU_CULTURE_TWO_TAG);
    console.log("2 문화공간 전통시설 crawaling is success..\n")

    //전주 문화공간 도서관(JEONJU_CULTURE_THREE_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_THREE_URL,JEONJU_CULTURE_THREE_TAG);
    console.log("3 문화공간 도서관 crawaling is success..\n")

    //전주 문화공간 문화센터(JEONJU_CULTURE_FOUR_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_FOUR_URL,JEONJU_CULTURE_FOUR_TAG);
    console.log("4 문화공간 문화센터 crawaling is success..\n")

    //전주 문화체험 전통문화(JEONJU_CULTURE_EXPERIENCE_ONE_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_EXPERIENCE_ONE_URL,JEONJU_CULTURE_EXPERIENCE_ONE_TAG);
    console.log("5 문화체험 전통문화 crawaling is success..\n")

    //전주 문화체험 농촌마을(JEONJU_CULTURE_EXPERIENCE_TWO_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_EXPERIENCE_TWO_URL,JEONJU_CULTURE_EXPERIENCE_TWO_TAG);
    console.log("6 문화체험 농촌마을 crawaling is success..\n")

    //전주 문화유적 향토문화유산(JEONJU_CULTURE_EXPERIENCE_TWO_URL) 크롤링
    await startJeonJuCulturePartCrawaling(JEONJU_CULTURE_HERITAG_ONE_URL,JEONJU_CULTURE_HERITAG_ONE_TAG);
    console.log("7 문화유적 향토문화유산 crawaling is success..\n")

    console.log(text)

    await jeonjuItemWrite(text)
    calcurlateTime(start)
    

   
  
}

startCrawaling()
