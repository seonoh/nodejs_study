let axiosModule = require('axios');
let cheerioModule = require('cheerio');

let totalCnt = '';
let finalKoreaVisitItem = [{}];
let text = '';

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
                cnt: `1000`
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        let koreaVisitItem = result.data['body']['result']

        console.log(`크롤링 데이터 TotalCount : ${cnt}`)

        for(let i = 0; i<koreaVisitItem.length; i++){
            
            await getDetailData(i,koreaVisitItem[i])
            console.log(`크롤링 진행도 : ${i}/${cnt}`)
        }



    } catch (err) {
        console.log(err)
        return;
    }


}
// {"cmd":"TOUR_CONTENT_BODY_VIEW","cotid":"d09abaad-511e-492d-a098-efebbb3f0a52"
// ,"locationx":"37.5891356","locationy":"127.01871489999999"}: 
const getDetailData = async (index,item) => {
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

        let detailItem = result.data['body']['article'][0]

        console.log(detailItem)

        item.tagName = `#${item.tagName.replace(/\|/gi,"#")}`
        
        try{
            detailItem.overView = detailItem.overView.replace(/,/gi," ")
            detailItem.overView = detailItem.overView.replace(/\n/gi," ")
            detailItem.overView = detailItem.overView.replace(/\r/gi," ")
            detailItem.overView = detailItem.overView.replace(/;/gi," ")
            detailItem.overView = detailItem.overView.replace(/&nbsp/gi,"")
            detailItem.overView = detailItem.overView.replace(/"/gi,"")
            detailItem.overView = detailItem.overView.replace(/'/gi,"")

            detailItem.overView = detailItem.overView.replace(/(<([^>]+)>)/gi,"");
            
            detailItem.overView = `${detailItem.overView}`
        }catch(err){
            detailItem.overView = "empty overview"
            console.log(`${item.title} ==> undefined overview !!!!!!`)
        }
        
        try{
            detailItem.infoCenter = detailItem.infoCenter.replace(/,/gi," &")
            detailItem.infoCenter = detailItem.infoCenter.replace(/<br>/gi," &")
            detailItem.infoCenter = detailItem.infoCenter.replace(/\n/gi," ")
        }catch(err){
            detailItem.infoCenter = "empty infoCenter"
            console.log(`${item.title} ==> undefined infoCenter !!!!!!`)
        }
        



        if(index == 0){
            text =`여행지이름,주소,태그,전화번호,홈페이지,영업일,OVERVIEW\n`
        }

        text += index+". "+item.title+","+item.addr1+","+item.tagName+","+detailItem.infoCenter+","+detailItem.homepage+","+detailItem.restDate+","+detailItem.overView+"\n"

        

    } catch (err) {
        console.log(err)
        return;
    }
}


    // cotId,addr2,distance,addr1,sigunguCode,title,tagName,
    // telNo,areaCode,viewCnt,imgPath,contentType,cid,

    // parking,distance,tagId,infoCenter,title,mapY,contentStatus,
    // mapX,overView,areaName,sigunguName,useTime,tel,contentType,
    // cotId,addr2,addr1,sigunguCode,dept,tagName,telNo,
    // setStatus,areaCode,heritage3,heritage2,heritage1,
    // imgPath,restDate,imgAlt,cid,deptView,homepage,useCash


async function koreaVisitItemWrite(text) {



    var fs = require('fs');

    await fs.writeFile(`./한국관광공사.csv`, text, async function (err) {
        if (err) {
            await console.log(err)
        } else {
            await console.log(`PROCESS COMPLETED !!`)
        }
    })



}

// 한국관광공사 크롤링 시작
const startTask = async () => {
    start = new Date().getTime();
    await getTotalCnt();
    await getKoreaVisitData(totalCnt);
    // console.log(text)
    await koreaVisitItemWrite(text);
    elapsed = new Date().getTime() - start;

    if(elapsed/1000 > 60){
        minute = Math.round(elapsed/1000/60)
        elapsed = elapsed/1000%60
    }else{
        minute = 0;
    }
    console.log(`크롤링 소요 시간 : ${ minute}분 ${(elapsed/1000).toFixed(2)}초`);
}


startTask()
