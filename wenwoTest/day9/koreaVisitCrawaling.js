let axiosModule = require('axios');
let cheerioModule = require('cheerio');
let qs = require('querystring')


var getData = async () => {
    let koreaData = {}
    try {
         koreaData =  await axiosModule({
            url: 'https://korean.visitkorea.or.kr/call',
            method : 'post',
            data : {
                'cmd' : 'TOUR_CONTENT_LIST_VIEW',
                'month' : "All",
                'areaCode' : "All",
                'sigunguCode' : "All",
                'tagId' : "All",
                'sortkind' : "1",
                'locationx' : "0",
                'locationy' : "0",
                'page' : "1",
                'cnt' : "10"

            },
            headers : {
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        console.log(JSON.stringify(koreaData.data))
        
        
    } catch (err) {
        console.log(err)
        return;
    }

}

getData();