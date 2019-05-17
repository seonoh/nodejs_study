let axiosModule = require('axios');
let cheerioModule = require('cheerio');

var mangoConfig = {
    headers: {

        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.mangoplate.com'
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
    try {

        var data = await axiosModule('https://www.mangoplate.com/search/%EB%AA%85%EB%8F%99?keyword=%EB%AA%85%EB%8F%99&page=1', mangoConfig);

        var $ = cheerioModule.load(data['data']);

        $test = $(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li`),

            $test.each(function (i, item) {
                $title = $(item).find(`.title`);
                $href = $(item).find(`figure > figcaption > div > a`).attr('href');

                console.log(i + " -> " + $title.text());

                let mangoItem = new MangoItem( $title.text() ,$href );
                async function test() {
                    sleep
                    await getDetailItem(mangoItem.href);
                } 

                test();
                
            
            })

    } catch (err) {
        console.log(err);
    }
}

function MangoItem(title, href){
    this.title = title;
    this.href = href;
}

const getDetailItem = async(href) =>{
    try {

        let result = await axiosModule(`https://www.mangoplate.com${href}`, mangoConfig);

        // console.log(result['data']);

        _ = cheerioModule.load(result['data']);

        _detail = _('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table > tbody');

        _detail.each(function(i,item){

            address = _(item).find('tr.only-desktop>td').text();
            titlePhoneNum = _(item).find('tr.only-desktop>th').text();
            phoneNum = _(item).find('tr.only-desktop>td').text();
            console.log(` 주소 : ${address}`);
        })
        

        


        

    
    }catch(err){
        console.log(err);
    }
}

getMangoPlateData();


