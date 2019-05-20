let axiosModule = require('axios');
let cheerioModule = require('cheerio');

var mangoConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.mangoplate.com'
    }
}

function test(item) {
    getDetailItem(item);
}

async function searchTitle(titleList,href){



    for(var i = 0; i<titleList.length; i++){
        console.log(`@#@#@#@# ${titleList}`)
        // let mangoItem = new MangoItem(titleList.firstChild[`data`],href);
        // console.log(`i : ${i} title : ${titleList.firstChild[`data`]} href : ${href}`)

        // await getDetailItem(mangoItem)
    }
   
}

const getMangoPlateData = async () => {
    try {
        

        var data =  await axiosModule('https://www.mangoplate.com/search/%EB%AA%85%EB%8F%99?keyword=%EB%AA%85%EB%8F%99&page=1', mangoConfig)

        var result = cheerioModule.load(data['data']);
        // > li:nth-child(1) > div:nth-child(1) > figure > figcaption > div > a > h2
        var titleList  = result(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li`);
        var href  = result(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li:nth-child(1) > div:nth-child(1) > figure > figcaption > div > a`).attr(`href`);
        
        var title  = titleList.find(`.title`)
        
        searchTitle(title,href)
        
        // title.each(async function(i,item){
            
        //     // console.log(item.firstChild)

        //     let mangoItem = new MangoItem(item.firstChild[`data`],href);
        //     console.log(`i : ${i} title : ${item.firstChild[`data`]} href : ${href}`)

        //     await getDetailItem(mangoItem)
        // })



        


    } catch (err) {
        console.log(err);
    }
}

function MangoItem(title, href) {
    this.title = title;
    this.href = href;
}

async function searchAddress(addressList){
    addressList.each(function (i, item) {

            
        titlePhoneNum = _(item).find('tr.only-desktop>th').text();
        phoneNum = _(item).find('tr.only-desktop>td').text();
        // console.log(`${mangoItem.title}`);
        console.log(` 주소 : ${address}\n`);

    })
}

const getDetailItem = async (mangoItem) => {
    try {

        // console.log(`${mangoItem.title}`)

        let result = await axiosModule(`https://www.mangoplate.com${mangoItem.href}`, mangoConfig);

        // console.log(result['data']);

        _ = cheerioModule.load(result['data']);

        _detail = _('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table > tbody');


        address = _(_detail).find('tr.only-desktop>td').text();
        console.log(` 주소 : ${address}\n`);
        
        searchAddress(_detail)
        // _detail.each(function (i, item) {

            
        //     titlePhoneNum = _(item).find('tr.only-desktop>th').text();
        //     phoneNum = _(item).find('tr.only-desktop>td').text();
        //     // console.log(`${mangoItem.title}`);
        //     console.log(` 주소 : ${address}\n`);

        // })



    } catch (err) {
        console.log(err);
    }
}

getMangoPlateData();
// console.log(`COMPLETE !!!`)