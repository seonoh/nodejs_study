let axiosModule = require('axios');
let util = require('../util')
let totalCnt = '';
let koreaVisitDataItemList = [];

const KOREA_VISIT_URL = 'https://korean.visitkorea.or.kr/call'
const INIT_ITEM = util.createCrawalingModel('인덱스', '이름', '주소', '태그', '전화번호', '홈페이지', '운영시간/휴무일', '이미지', '입장료', '주차시설', '소개\n')
koreaVisitDataItemList.push(INIT_ITEM)

const CREATE_VISIT_DATA_CONFIG = (cnt)=> {

    var config = {
        url: KOREA_VISIT_URL,
        method: 'post',
        data: {
            'cmd': 'TOUR_CONTENT_LIST_VIEW',
            'month': "All",
            'areaCode': "All",
            'sigunguCode': "All",
            'tagId': "All",
            'sortkind': "1",
            'locationx': "0",
            'locationy': "0",
            'page': "1",
            'cnt': `${cnt}`

        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }

    return config

}

const VISIT_DETAIL_DATA_CONFIG = (contentsId)=>{
    let config = {
        url: KOREA_VISIT_URL,
        method: 'post',
        data: {
            'cmd': 'TOUR_CONTENT_BODY_VIEW',
            'cotid': `${contentsId}`,
            'locationx': "0",
            'locationy': "0"
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }
    return config
}

// 총 데이터의 개수 함수
const getTotalCnt = async () => {
    let koreaData = {}
    try {
        koreaData = await axiosModule(
            CREATE_VISIT_DATA_CONFIG(1)
        )

        totalCnt = koreaData.data['body']['totalCount']

        console.log(`TOTAL_COUNT ==> ${totalCnt}\n\n`)
        return totalCnt;

    } catch (err) {
        console.log(err)
        return;
    }

}

// 총 데이터의 개수만큼 데이터 크롤링 
const getKoreaVisitData = async (cnt) => {
    let result = '';

    try {
        result = await axiosModule(
            // CREATE_VISIT_DATA_CONFIG(cnt)

            CREATE_VISIT_DATA_CONFIG(cnt)
        )
    } catch (err) {
        console.log(err)
    }

    let koreaVisitItem = result.data['body']['result']

    console.log(`크롤링 데이터 TotalCount : ${cnt}`)

    for (let i = 0; i < cnt; i++) {

        await getDetailData(i, koreaVisitItem[i])
        console.log(`크롤링 진행도 : ${i}/${cnt}`)
    }

}
// {"cmd":"TOUR_CONTENT_BODY_VIEW","cotid":"d09abaad-511e-492d-a098-efebbb3f0a52"
// ,"locationx":"37.5891356","locationy":"127.01871489999999"}: 
const getDetailData = async (index, item) => {
    let result = '';

    try {
        result = await axiosModule(
            VISIT_DETAIL_DATA_CONFIG(item.cotId)
        )

    } catch (err) {
        console.log(`ERROR === >> \n${err}`)
        return;
    }

    let detailItem = result.data['body']['article'][0]

    // console.log(detailItem)


    let title = ''
    let addr = ''
    let tag = ''
    let telNum = ''
    let homepage = ''
    let restDate = ''
    let imgPath = ''
    let enterCharge = ''
    let parkInfo = ''
    let overView = ''

    //값 유무 판별, 
    //ex)detailItem.infoCenter의 경우 tel,telNo 형식으로 오는 경우 예외 처리
    //질문 여기서 detailItem JSON Object인데,
    //detailItem에 infoCenter가 존재하지 않았을 때 undefiend처리를 해주어도 에러가 발생하는이유
    //데이터가 없는데 불러왔으면 null이 떠야하는 것이 아닌지.

    try {
        if (typeof (item.title) == undefined) {
            detailItem.title = detailItem.title;
            title = ''
        } else {
            title = item.title
        }


        if (typeof (item.addr1) == 'undefined') {
            addr = ''
        } else {
            addr = item.addr1
        }

        if (typeof (item.tagName) == 'undefined') {
            tag = ''
        } else {
            if (item.tagName == '') {

            } else {
                tag = item.tagName
            }
        }

        // try {
            if (typeof (detailItem.infoCenter) == 'undefiend') {
                detailItem.infoCenter = ''
            } else {
                detailItem.infoCenter = detailItem.infoCenter
            }
        // } catch (err) {
        //     try {
        //         if (typeof (detailItem.tel) == 'undefiend') {
        //             telNum = ''
        //         } else {
        //             telNum = detailItem.tel
        //         }
        //     } catch (err) {
        //         try {
        //             if (typeof (detailItem.telNo) == 'undefiend') {
        //                 telNum = ''
        //             } else {
        //                 telNum = detailItem.telNo
        //             }
        //         } catch (err) {
        //             telNum = ''
        //         }
        //     }

        // }


        try {
            if (typeof (detailItem.homepage) == 'undefined') {
                homepage = ''
            } else {
                homepage = detailItem.homepage
            }
        } catch (err) {
            try {
                if (typeof (detailItem.reservationUrl) == 'undefined') {
                    homepage = ''
                } else {
                    homepage = detailItem.reservationUrl
                }
            } catch (err) {
                homepage = ''
            }


        }


        try {
            if (typeof (detailItem.restDate) == 'undefined') {
                restDate = ''
            } else {
                restDate = detailItem.restDate
            }
        } catch (err) {
            restDate = ''
        }

        try {
            if (typeof (detailItem.imgPath) == 'undefined') {
                imgPath = ``
            } else {
                if(detailItem.imgPath == null | detailItem.imgPath ==""){
                    imgPath = ''
                }else{
                    imgPath = `https://support.visitkorea.or.kr/img/call?cmd=VIEW&id=${detailItem.imgPath}`
                }
            }
        } catch (err) {
            imgPath = ''
        }


        try {
            if (typeof (detailItem.parking) == 'undefined') {
                parkInfo = ``
            } else {
                parkInfo = detailItem.parking
            }
        } catch (err) {
            parkInfo = ''
        }




        try {
            if (typeof (detailItem.overView) == 'undefined') {
                overView = ""
            } else {
                overView = detailItem.overView
            }
        } catch (err) {
            overView = ""
        }



    } catch (err) {
        console.log(err)
    }

    item = util.createCrawalingModel(
        index,
        title,
        addr,
        tag,
        telNum,
        homepage,
        restDate,
        imgPath,
        enterCharge,
        parkInfo,
        overView)

    koreaVisitDataItemList.push(item)

}

// 한국관광공사 크롤링 시작
exports.startKoreaVisitCrawaling = async () => {
    start = new Date().getTime();
    
    await getKoreaVisitData(await getTotalCnt());
    // await getKoreaVisitData(1);
    console.log("crawaling data is loaded..")
    console.log("crawaling data writing..")
    console.log(koreaVisitDataItemList)
    // await util.writeData('한국관공공사리펙토링버전', koreaVisitDataItemList)
    util.calcurlateTime(start,"크롤링 소요 시간")
    return koreaVisitDataItemList;
}


// this.startKoreaVisitCrawaling()