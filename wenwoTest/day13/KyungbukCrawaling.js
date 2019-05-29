let axiosModule = require('axios')
let cheerioModule = require('cheerio')
let requestModule = require('../request.js')
let util = require('../util.js')
let curSequence = 0;
let kyungbukItemList = [];

const KYUNGBUK_NATURE_URL = 'http://tour.gb.go.kr/page.do?pageNo=1&pageSize=&mnu_uid=982&code_uid=1044&srchKwd=&srchFunc=&srchDate=11&srchArea=&&srchSearch=&srchSearchArea='
// const KYUNGBUK_DETAIL_URL = 'http://tour.gb.go.kr/gbtour/page.do?pageSize=&mnu_uid=982&code_uid=1044&srchFunc=&srchKwd=&srchArea=&srchDate=11&&srchSearch=&srchSearchArea=&con_uid=16865&pageNo=1&cmd=2'
// const KYUNGBUK_DETAIL_URL = 'http://tour.gb.go.kr/gbtour/page.do?pageSize=&mnu_uid=982&code_uid=1044&srchFunc=&srchKwd=&srchArea=&srchDate=11&&srchSearch=&srchSearchArea=&con_uid=16995&pageNo=1&cmd=2'

const getPageCnt = async(url)=>{
    let result = await requestModule.networkRequest(url)
    let data = cheerioModule.load(result)
    let totalPage = data('#contents > div > div.stroy-list > div.webzine-list.add-info > div.paging-wrap > a.arr.end').attr('href')
    let totalPageCnt = totalPage.split('?')[1].split('&')[0].replace(/[^0-9]*/,"")
    return totalPageCnt;
}

const getNatureData = async(totalCnt) => {
    
    for(var i = 1; i<=1; i++){
        let useUrl = KYUNGBUK_NATURE_URL.replace(/pageNo=\d*/gi,`pageNo=${i}`)
        // let useUrl = KYUNGBUK_NATURE_URL
        let data = await requestModule.networkRequest(useUrl)
        let ci = cheerioModule.load(data)

        let natureItemList = ci('#contents > div > div.stroy-list > div.webzine-list.add-info > ul > li')

        for(let j = 0; j<natureItemList.length; j++){

            // console.log(ci(natureItemList[j]).find('div > dl > dt > b > a').attr('href'))
            let href = 'http://tour.gb.go.kr/'+ci(natureItemList[j]).find('div > dl > dt > b > a').attr('href')
            let tag = ci(natureItemList[j]).find('div > dl > dt > div.option-wrap > span')
            // console.log("1 : "+tag.text())
            await getNatureDetailData(href,tag.text())
        }

    }
}

const getNatureDetailData = async(url,sendedTag)=>{
    // console.log(url)
    let result = await requestModule.networkRequest(url)
    let ci = cheerioModule.load(result)

    if(curSequence == 0){
        item = util.createCrawalingModel('인덱스','이름','주소','태그','전화번호','홈페이지','운영시간/휴무일','이미지','소개\n')
        
    }else{

        name = ci('#contents > div > div.view-wrap > h5').text()
        addr = ci('#contents > div > div.view-wrap > div.view-con > div.con-info > div > table > tbody > tr:nth-child(1) > td').text()
        tag = sendedTag
        phone = ci('#contents > div > div.view-wrap > div.view-con > div.con-info > div > table > tbody > tr:nth-child(2) > td').text()
        homepage = ci('#contents > div > div.view-wrap > div.view-con > div.con-info > div > table > tbody > tr:nth-child(3) > td > a').attr('href')
        restDate = ''
        imgPath = ci('#contents > div > div.view-wrap > div.view-con > div.con-img > img').attr('src')
        console.log(imgPath)
        
        
        overView = ci('#v-1 > p').text()

        item = util.createCrawalingModel(curSequence,name,addr,tag,phone,homepage,restDate,imgPath,overView)

    }
    // console.log(kyungbukItemList)

    kyungbukItemList.push(item)

    curSequence++;

  

}
const startCrawaling = async()=>{
    await getNatureData(await getPageCnt(KYUNGBUK_NATURE_URL))
    await util.writeData('경북여행정보',kyungbukItemList)
    
}

startCrawaling()