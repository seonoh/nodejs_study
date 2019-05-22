let axiosModule = require('axios');
let cheerioModule = require('cheerio');

// // var formData = new FormData();
// var params = new URLSearchParams();

// params.append('cmd', 'TOUR_CONTENT_LIST_VIEW')
// params.append('month', 'All')
// params.append('areaCode', 'All')
// params.append('sigunguCode', 'All')
// params.append('tagId', 'All')
// params.append('sortkind', 'All')
// params.append('locationx', '0')
// params.append('locationy', '0')
// params.append('page', '1')
// params.append('cnt', '10')



var koreaConfig = {
    method : 'post',

    data:
    {

        'cmd': 'TOUR_CONTENT_LIST_VIEW',
        'month': 'All',
        'areaCode': 'All',
        'sigunguCode': 'All',
        'tagid': 'All',
        'sortkind': '1',
        'locationx': '0',
        'locationy': '0',
        'page': '1',
        'cnt': '10',
        // 'compid':'All'
        // ?cmd=TOUR_CONTENT_LIST_VIEW&month=All&areaCode=All&sigunguCode=All&tagId=All&sortkind=1&locationx=0&locationy=0&page

    },
    headers: {


        // 'Date': 'Wed, 22 May 2019 04:56:57 GMT',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'https://korean.visitkorea.or.kr',
        'Referer': 'https://korean.visitkorea.or.kr/list/ms_list.do?areacode=All',
        'Host': 'korean.visitkorea.or.kr',
        'Server': 'Apache',
        'Keep-Alive': 'timeout=5, max=55',
        'Connection': 'Keep-Alive',
        'Transfer-Encoding': 'chunked',

        'X-Requested-With' : 'XMLHttpRequest',
        'X-Cache-Id' : '4a396fe6bb6df19807021dd255456504'
        // ga=GA1.3.1317974727.1558485128; _gid=GA1.3.1009944323.1558485128; 
        // JSESSIONID=FEB179E0708ECD0B8B356DF0562D1036.instance1; wcs_bt=e145ca1b39e890:1558488195; _gat=1
        

        // https://korean.visitkorea.or.kr/list/ms_list.do?areacode=All

        // https://korean.visitkorea.or.kr/call?cmd=TOUR_CONTENT_LIST_VIEW&month=All&areaCode=All&sigunguCode=All&tagId=All&sortkind=1&locationx=0&locationy=0&page=1&cnt=10

    },
    cookies : {


            // ga : 'GA1.3.1317974727.1558485128',
            // _gid : 'GA1.3.1009944323.1558485128',
            JSESSIONID: '25BA2BB91B55C070C66297C9CA124EEF.instance1',
            // JSESSIONID : 'NOQIiJa57SfKEAbGvrtOV69FlmknaKapxFkSiVKakYI1C3aRUkvjayatw7l7aHJs',

            // wcs_bt : 'e145ca1b39e890:1558489285',
            // _gat : '1'
        
    }
}

var getKoreaVisitData = async () => {


    try {
        var koreaData = await axiosModule.post(`https://korean.visitkorea.or.kr/call?cmd=TOUR_CONTENT_LIST_VIEW&month=All&areaCode=All&sigunguCode=All&tagId=All&sortkind=1&locationx=0&locationy=0&page=1&cnt=10`,koreaConfig)
        console.log(typeof(koreaData))

        console.log(`koreaData === >>> ${koreaData.html()} \n =======================================================================\n`)
        // var item = await cheerioModule.load(koreaData['data'])

        // var test = item('#contents > div:nth-child(1) > div.top_cont.clfix > div.top_leftCont > div:nth-child(1) > ul > li:nth-child(1) > a')
       
        
        console.log('test ===>>> \n' +  item(test).find('em') + "===========================================================================\n")


    } catch (err) {
        console.log(err)
    }

}

getKoreaVisitData();