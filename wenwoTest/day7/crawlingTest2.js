let axiosModule = require('axios');
let cheerioModule = require('cheerio');

var mangoConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.mangoplate.com'
    }
}

const getMangoPlateData = async () => {
    try {


        var data = await axiosModule('https://www.mangoplate.com/search/%EB%AA%85%EB%8F%99?keyword=%EB%AA%85%EB%8F%99&page=1', mangoConfig)

        var result = cheerioModule.load(data['data']);
        // > li:nth-child(1) > div:nth-child(1) > figure > figcaption > div > a > h2
        var titleList = result(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li`);
        var href  = result(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li:nth-child(1) > div:nth-child(1) > figure > figcaption > div > a`).attr(`href`);

       
        var title = titleList.find(`.title`);


        title.each(async function (i, item) {
            $title = $(item).find(`.title`);
            $href = $(item).find(`figure > figcaption > div > a`).attr('href');
            let mangoItem = new MangoItem( $title.text() ,$href );
            
            console.log(`href : ${$href}`)
           
            // let mangoItem = new MangoItem(item.firstChild[`data`], href);
            // console.log(`i : ${i} title : ${item.firstChild[`data`]} href : ${href}`)

            await getDetailItem(mangoItem)
        })






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

        let result = await axiosModule(`https://www.mangoplate.com${mangoItem.href}`, mangoConfig);

        _ = cheerioModule.load(result['data']);

        _detail = _('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table > tbody');
        // console.log(` _detail : ${_detail.text()}\n`);

        _detail.each(function (i, item) {

            address = _(_detail).find('tr.only-desktop>td').text();
            mangoItem.address = address;
            // console.log(` 주소 : ${address}\n`);

        })



    } catch (err) {
        console.log(err);
    }
}

getMangoPlateData();


