let axiosModule = require('axios');
let cheerioModule = require('cheerio');

var mangoConfig = {
    headers: {

        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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

function test(item) {

    getDetailItem(item);

}

const getMangoPlateData = async () => {
    try {

        var data = await axiosModule('https://www.mangoplate.com/search/%EB%AA%85%EB%8F%99?keyword=%EB%AA%85%EB%8F%99&page=1', mangoConfig);

        var $ = cheerioModule.load(data['data'],async function(err,res){
            $test = $(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li`);

            $test.each( function (i, item) {
                console.log(`${i}`);
                $title = $(item).find(`h2.title`);
                console.log(`${$title.text()}`)
    
                // array = JSON.stringify($title.text())
    
                
                // console.log(`${$title.text().split(' ')}`)
    
                // array.each(function (i, item) {
    
                //     console.log(`@#@#@#@# ${item}`)
                //     // console.log(`******** ---> ${item[i]}`)
                // })
                console.log(`\n`)
    
                $href = $(item).find(`figure > figcaption > div > a`).attr('href');
    
                let mangoItem = new MangoItem($title.text(), $href);
    
                // await test(mangoItem.href);
                console.log(`${$title.text().split(' ',2)}`)
                test(mangoItem);
                // console.log(`mangoItem.title ${mangoItem.title} mangoItem.href : ${mangoItem.href}`);
    
            });
        });

        

    } catch (err) {
        console.log(err);
    }
}

function MangoItem(title, href) {
    this.title = title;
    this.href = href;
}

const getDetailItem = async (mangoItem) => {
    try {

        // console.log(`${mangoItem.title}`)

        let result = await axiosModule(`https://www.mangoplate.com${mangoItem.href}`, mangoConfig);

        // console.log(result['data']);

        _ = cheerioModule.load(result['data']);

        _detail = _('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table > tbody');

        _detail.each(function (i, item) {

            address = _(item).find('tr.only-desktop>td').text();
            titlePhoneNum = _(item).find('tr.only-desktop>th').text();
            phoneNum = _(item).find('tr.only-desktop>td').text();
            console.log(`${mangoItem.title}`);
            console.log(` 주소 : ${address}\n`);

        })



    } catch (err) {
        console.log(err);
    }
}

getMangoPlateData();