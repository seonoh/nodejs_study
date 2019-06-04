let customRequestModule = require('../netRequest.js')
let cheerioModule = require('cheerio')
let util = require('../util')

const GANGWON_TOUR_URL = 'http://www.gangwon.to/tour/gangwondo_trip'
const GANGWON_TEMPLESTAY_URL = 'http://www.gangwon.to/tour/gangwondo_trip/templestay'
const GANGWON_FIRM_URL = 'http://www.gangwon.to/tour/go_to_kangwondo/filmingsite'
const GANGWON_ACCOMMODATION_URL = 'http://www.gangwon.to/tour/sightseeing_guide/accommodation'

let curSequence = 1;
const INIT_ITEM = util.createCrawalingModel('인덱스', '이름', '주소', '태그', '전화번호', '홈페이지', '운영시간/휴무일', '이미지', '입장료', '주차시설', '소개\n')
let gangwonItemList = [];
gangwonItemList.push(INIT_ITEM)

const getTourItemCnt = async (url) => {
    let tourResult = await customRequestModule.networkGetRequest(url)
    let ci = cheerioModule.load(tourResult)
    let totalCnt = ci('#A-Contents > div > section > section > p > span').text().replace("건", '')
    console.log(`TOTAL_COUNT -- >> ${totalCnt}`)
    return Math.ceil(totalCnt / 6);  //페이지당 6개의 아이템 --> 총 페이지수를 나타낸다.
}

const getTourItemData = async (url, pageNum) => {
    console.log(`pageNum : ${pageNum}`)
    // let tourResult = await axiosModule.post(GANGWON_TOUR_URL,config)
    let tourResult = await customRequestModule.useConfigRequest(
        {
            'url': url,

            method: 'post',
            params: {
                'pageIndex': pageNum,
                'mode': "",
                'all': "",
                'all': ""
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=688BB4CADBE6B7155CB78D49C23839DD'
            }
        }
    )

    let ci = cheerioModule.load(tourResult)
    let hrefList = ci('#A-Contents > div > section > section > ul > li')
    for (let i = 0; i < hrefList.length; i++) {
        tempHref = `http://www.gangwon.to${ci(hrefList[i]).find('div>a').attr('href')}`
        tempImagePath = `http://www.gangwon.to${ci(hrefList[i]).find('div>a>img').attr('src')}`
        await getDetailItemData(tempHref, tempImagePath)
    }

}

const getDetailItemData = async (sendedHref, sendedImgPath) => {
    let detailResult = ''
    try {
        detailResult = await customRequestModule.networkGetRequest(sendedHref)
    } catch (err) {
        console.log(`getDetailItemData ERROR =====>>>>  ${err}`)
        return;
    }

    let ci = cheerioModule.load(detailResult)
    let base = ci('#A-Contents > div > section > header > div.inner > div')
    let title = ci(base).find('div.clear > h1').text().replace(/\n/gi, "")
    let addr = ci(base).find('div.binder > dl > dd:nth-child(6)').text()
    let tag = '강원도#춘천#관광지#' + ci(base).find('div.binder > dl > dd:nth-child(2)').text()
    let innerBase = ci('#A-Contents > div > section > section.help > div.clear.inner')
    let tel = ci(innerBase).find('div:nth-child(1) > div.clear.tel > p').text()
    let homepage = ci(innerBase).find('div:nth-child(2) > div.clear.homepage > p > a').attr('href')
    let restDate = ci(innerBase).find('div:nth-child(2) > div.clear.dayoff > p').text()
    let enterCharge = ci(innerBase).find('div:nth-child(1) > div.clear.price > p').text()
    let parkInfo = ci(innerBase).find('div:nth-child(1) > div.clear.park > p').text()
    let imgPath = sendedImgPath
    let overView = ci(base).find('div > div.binder > p').text()

    item = util.createCrawalingModel(curSequence, title, addr, tag, tel, homepage, restDate, imgPath, enterCharge, parkInfo, overView)

    curSequence++;
    gangwonItemList.push(item)
    console.log(item)
}

const startCrawaling = async (url) => {
    let repeatCnt = await getTourItemCnt(url)
    console.log(`TOTAL PAGE CNT ===> ${repeatCnt}`)

    for (let i = 1; i <= repeatCnt; i++) {
        await getTourItemData(url, i)
    }


}


exports.startGangwonCrawaling = async () => {
    start = new Date().getTime();
    await startCrawaling(GANGWON_TOUR_URL)
    await startCrawaling(GANGWON_TEMPLESTAY_URL)
    await startCrawaling(GANGWON_FIRM_URL)
    await startCrawaling(GANGWON_ACCOMMODATION_URL)
    // await util.writeData("강원도여행정보", gangwonItemList)

    return gangwonItemList;
    // util.calcurlateTime(start, "Gangwon Crawaling")
}

this.startGangwonCrawaling()

