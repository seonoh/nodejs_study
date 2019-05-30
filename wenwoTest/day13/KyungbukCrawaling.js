let axiosModule = require('axios')
let cheerioModule = require('cheerio')
let requestModule = require('../netRequest.js')
let util = require('../util.js')
let curSequence = 0;

const INIT_ITEM = util.createCrawalingModel('인덱스', '이름', '주소', '태그', '전화번호', '홈페이지', '운영시간/휴무일', '이미지', '소개\n')
let kyungbukItemList = [];
kyungbukItemList.push(INIT_ITEM)

const KYUNGBUK_ALL_URL = 'http://tour.gb.go.kr/gbtour/page.do?pageNo=1&pageSize=&mnu_uid=196&code_uid=&srchKwd=&srchFunc=&srchArea=&srchDate=&&srchSearch=1043,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1046,1047,1049,1083,1060,1061,1062,1064,1063,1303,1050,1051,1052,1086,1053,1054,1055,1066,1321&srchSearchArea='
// const KYUNGBUK_NATURE_URL = 'http://tour.gb.go.kr/page.do?pageNo=1&pageSize=&mnu_uid=982&code_uid=1044&srchKwd=&srchFunc=&srchDate=11&srchArea=&&srchSearch=&srchSearchArea='
// const KYUNGBUK_CULTURE_URL = 'http://tour.gb.go.kr/page.do?pageNo=1&pageNo=9&pageSize=&mnu_uid=983&code_uid=1044&srchKwd=&srchFunc=&srchArea=&srchDate=&&srchSearch=&srchSearchArea='


const getPageCnt = async (url) => {
    let result = await requestModule.networkRequest(url)
    let data = cheerioModule.load(result)
    let totalPage = data('#contents > div > div.stroy-list > div.webzine-list.add-info > div.paging-wrap > a.arr.end').attr('href')
    let totalPageCnt = totalPage.split('?')[1].split('&')[0].replace(/[^0-9]*/, "")
    return totalPageCnt;
}

const getData = async (totalCnt) => {
    console.log(`crawaling total page : ${totalCnt}`)

    for (var i = 1; i <= totalCnt; i++) {
        console.log(`===============================================================================`)
        console.log(`${i} page crawaling start`)
        console.log(`===============================================================================`)

        let useUrl = KYUNGBUK_ALL_URL.replace(/pageNo=\d*/gi, `pageNo=${i}`)
        let data = await requestModule.networkRequest(useUrl)
        let ci = cheerioModule.load(data)

        let natureItemList = ci('#contents > div > div.stroy-list > div.webzine-list.add-info > ul > li')

        for (let j = 0; j < natureItemList.length; j++) {
            let href = 'http://tour.gb.go.kr/' + ci(natureItemList[j]).find('div > dl > dt > b > a').attr('href')
            let tag = ci(natureItemList[j]).find('div > dl > dt > div.option-wrap > span')
            await getNatureDetailData(href, tag.text())
        }
        console.log(`===============================================================================`)
        console.log(`${i} page crawaling complete`)
        console.log((`===============================================================================`))
    }
}

const getNatureDetailData = async (url, sendedTag) => {
    // console.log(url)
    let result = await requestModule.networkRequest(url)
    let ci = cheerioModule.load(result)

        base = ci('#contents > div > div.view-wrap > div.view-con > div.con-info > div > table > tbody')

        name = ci('#contents > div > div.view-wrap > h5').text()
        addr = ci(base).find('tr:nth-child(1) > td').text()

        tag = sendedTag

        phone = ci(base).find(' tr:nth-child(2) > td').text()
        homepage = ci(base).find('tr:nth-child(3) > td > a').attr('href')
        
        restDate = ''
        imgPath = 'http://tour.gb.go.kr' + ci('#view_con_img > div > div >img').attr('src')
        overView = ci('#v-1 > p').text()

        item = util.createCrawalingModel(curSequence, name, addr, tag, phone, homepage, restDate, imgPath, overView)

    kyungbukItemList.push(item)
    console.log(item)
    curSequence++;



}
const startCrawaling = async () => {
    // await getData(await getPageCnt(KYUNGBUK_NATURE_URL))
    start = new Date().getTime(); 
    await getData(await getPageCnt(KYUNGBUK_ALL_URL))
    await util.writeData('경북여행정보', kyungbukItemList)
    util.calcurlateTime(start,'Kyungbuk Crawaling')

}

startCrawaling()