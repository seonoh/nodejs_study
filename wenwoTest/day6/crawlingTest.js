let axiosModule = require('axios');
let cheerioModule = require('cheerio');

var mangoConfig= {
    headers:{
        
        'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        // 'User-Agent' : 'PostmanRuntime/7.11.0',
        // 'Accept' : '*/*',
        // 'Cache-Control' : 'no-cache',
        // 'Postman-Token' : 'cddda439-b3e0-4b61-a893-c878c3099a81',
        // 'Host': 'www.mangoplate.com',
        // 'accept-encoding' : 'gzip, deflate',
        // 'content-length' : '14',
        // 'Connection' : 'keep-alive'
    }
}


// axios({
//     url: 'https://www.mangoplate.com/search',
//     method: 'get',
//     data: {
//         keyword: '명동'
//     }
//   })

const getMangoPlateData = async () => {
    try{
         var data = await axiosModule('https://www.mangoplate.com/search/%EB%AA%85%EB%8F%99?keyword=%EB%AA%85%EB%8F%99&page=1',mangoConfig);
        //  console.log(data['data']);

        var $ = cheerioModule.load(data['data'], { decodeEntities: true });
        
        // body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li:nth-child(1) > div:nth-child(1) > figure > figcaption > div > a > h2
        // for(let i=1; i)
        
        $test = $(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li`),
        
        $test.each(function(i,item){
            $title = $(item).find(`.title`);
            console.log(i+", "+$title.text());
            // console.log(i+", "+$title.text()[i][i]);
        })

        // $test2 = $test.find()

        // console.log("RESULT ====>>>> "+$test);

    }catch(err){
        console.log(err);
    }
}


getMangoPlateData();


