let axiosModule = require('axios');
let cheerioModule = require('cheerio');
let qs = require('querystring')


const options = {

}

var getData = async () => {
    try {

        var koreaData =  await axiosModule('https://korean.visitkorea.or.kr',{
            url: '/list/ms_list.do?areacode=All',
            method : 'post',
            data : {
                cmd : 'TOUR_CONTENT_LIST_VIEW',
                month : "All",
                areaCode : "All",
                sigunguCode : "All",
                tagId : "All",
                sortkind : "1",
                locationx : "0",
                locationy : "0",
                page : "1",
                cnt : "10"

            },
            headers : {
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'content-type': 'application/x-www-form-urlencoded'
            }
        })

        

        var itemData = await cheerioModule.load(koreaData['data'])

        console.log(JSON.stringify(itemData))
        // var result = itemData('#contents > div.wrap_contView.clfix > div.box_leftType1 > ul > li:nth-child(1) > div.area_txt > div.tit > a');
        // console.log(result[`data`]);
        // #contents > div.wrap_contView.clfix > div.box_leftType1 > ul > li:nth-child(2) > div.area_txt > div > a
        // var test = itemData(result).find('li:nth-child(2) > div.area_txt > div > a')
        // console.log(test.each(function(i,item){
           
        // }))
        
    } catch (err) {
        console.log(err)
    }

}

getData();