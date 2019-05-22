let axiosModule = require('axios');
let cheerioModule = require('cheerio');

let totalCnt = '';

// 총 데이터의 개수 함수
const getTotalCnt = async () => {
    let koreaData = {}
    try {
        koreaData = await axiosModule({
            url: 'https://korean.visitkorea.or.kr/call',
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
                'cnt': "1"
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        totalCnt = koreaData.data['body']['totalCount']

        console.log(`TOTAL_COUNT ==> ${totalCnt}`)
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
        result = await axiosModule({
            url: 'https://korean.visitkorea.or.kr/call',
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
                // 'cnt': `${cnt}`
                'cnt': `10`
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        let koreaVisitItem = result.data['body']['result']

        for(let i = 0; i<koreaVisitItem.length; i++){
            await getDetailData(koreaVisitItem[i])
            // console.log(`${i} ==>> ${koreaVisitItem[i].cotId}`);
        }

        // console.log(koreaVisitItem);


    } catch (err) {
        console.log(err)
        return;
    }


}
// {"cmd":"TOUR_CONTENT_BODY_VIEW","cotid":"d09abaad-511e-492d-a098-efebbb3f0a52"
// ,"locationx":"37.5891356","locationy":"127.01871489999999"}: 
const getDetailData = async (item) => {
    let result = '';

    try {
        result = await axiosModule(
            {
                url: 'https://korean.visitkorea.or.kr/call',
                method: 'post',
                data: {
                    'cmd': 'TOUR_CONTENT_BODY_VIEW',
                    'cotid': `${item.cotId}`,
                    'locationx': "0",
                    'locationy': "0"
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
        )

        console.log(result.data['body']['article'])

    } catch (err) {
        console.log(err)
        return;
    }
}

// 한국관광공사 크롤링 시작
const startTask = async () => {
    await getTotalCnt();
    await getKoreaVisitData(totalCnt);
}


startTask()
