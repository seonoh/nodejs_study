
//이름, 주소, 연락처, 홈페이지, 태그
let axiosModule = require('axios')
let cheerioModule = require('cheerio');

//전주 메인
const JEONJU_MAIN_URL = 'http://tour.jeonju.go.kr'

//문화공간 -> 관람시설
const JEONJU_CULTURE_ONE_URL = 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a74f72e96b014f829af04c0477&tag=%EA%B4%80%EB%9E%8C%EC%8B%9C%EC%84%A4&timg=01'


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
    console.log(`PAGE == > ${pageList.length}`)


    for (var i = 0; i < pageList.length; i++) {

        //첫 페이지의 경우 href 따로 존재않기 때문에 조건문.
        if(i == 0){
            currentUrl = JEONJU_CULTURE_ONE_URL;
        }else{
            nextPageHref = ci(pageList[i]).attr('href')
            currentUrl = `${JEONJU_MAIN_URL}${nextPageHref}`
        }
        // console.log(currentUrl)
        await getJeonJuCultureData(currentUrl)
    }

}

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

    let cultureItemImagePath = detailItem.find('li:nth-child(1) > ul > li > img').attr('src')
    let cultureItem = detailItem.find('li:nth-child(2) > ul')

    let cultureItemTitle = cultureItem.find('li.image_board_detail_title').text().trim()
    let cultureItemAddr = cultureItem.find('span.address~strong').text()
    let cultureItemTel = cultureItem.find('span.phone~strong').text()
    let cultureItemHome = cultureItem.find('span.link~strong').text()

    let cultureItemOverView = ci('#image_board > div.detail_content > div.detail_cont_txt').text()

    console.log(`image : ${cultureItemImagePath}`)
    console.log(`title : ${cultureItemTitle}`)
    console.log(`addr : ${cultureItemAddr}`)
    console.log(`tel : ${cultureItemTel}`)
    console.log(`homepage : ${cultureItemHome}`)
    console.log(`================================================================================`)
    // console.log(`overview : ${cultureItemOverView}`)

}

getJeonJuCulturePageCnt(JEONJU_CULTURE_ONE_URL)