let axiosModule = require('axios');
let cheerioModule = require('cheerio');
var array = new Array();

let result = '';

var diningConfig = {
    headers: {

        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.diningcode.com/'

    }
}

// axios({
//     url: 'https://www.mangoplate.com/search',
//     method: 'get',
//     data: {
//         keyword: '명동'
//     }
//   })

function DingingItem(title, href) {
    this.title = title
    this.href = href
}


var getDiningcodeData = async () => {
    try {

        var data = await axiosModule('https://www.diningcode.com/', diningConfig);

        var htmlData = cheerioModule.load(data['data']);


        var diningItem = await htmlData(`#div_review_realtime`)


        var titleList = await htmlData(diningItem).find(`div.img-grade.button`)

        var href = await htmlData(titleList).map(async function (i, item) {
            let hrefData = await htmlData(item).attr('onclick').split(`='`)[1].split(`'`)[0]
            array[i] = { title: ``, href: hrefData, address: ``, tel: `` };
        })

        var title = await (titleList).find(`p.btxt`).map(async function (i, item) {
            array[i].title = await item.firstChild.data;
        })

        for (var i = 0; i < array.length; i++) {
            await getDetailData(array[i]);
            result += (`${i},${array[i].title},${array[i].address},${array[i].tel} \n`)
            // console.log(result)
        }

        // diningItemWrite(result);



    } catch (err) {
        console.log(`ERROR ===>>> ${err}`);
    }
}

var getDetailData = async (item) => {
    try {
        // console.log(item);

        var detailData = await axiosModule(`https://www.diningcode.com${item.href}`, diningConfig);
        var detailHtmlData = await cheerioModule.load(detailData[`data`]);

        var detailAddrItem = detailHtmlData(`#div_profile > div.s-list.basic-info > ul > li.locat`)
        var detailTelItem = detailHtmlData(`#div_profile > div.s-list.basic-info > ul > li.tel`)

        item.address = detailAddrItem.text()
        item.tel = detailTelItem.text()

    } catch (err) {
        console.log(`ERROR ===>>> ${err}`);
    }
}



async function diningItemWrite(text) {


    var fs = require('fs');

    await fs.writeFile(`./diningcode.csv`, text, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`PROCESS COMPLETED !!`)
        }
    })



}

var moreConfig = {

    params: {
        mode: `TODAY_LIST`,
        type: `review_realtime`,
        start_id: 94270,
        page: 2
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.diningcode.com'
    },
    cookies: {
        'dcadid': `WUZPM1558400190`,
        'PHPSESSID': `hq41g32mh6tt5mfq0o00i1nol6`,
        '_ga': `GA1.2.760214489.1558400195`,
        '_gid': `GA1.2.1431731918.1558400195`,
        '_fbp': `1.1558400195327.1816475421`,
        'dclogid': `dclogid`,
        'dcpopup': `Y`,
        'dckeyword': `%5B%22%5Cuc778%5Cub355%5Cuc6d0+%5Cubc31%5Cuc885%5Cuc6d0%5Cuc7583%5Cub300%5Cucc9c%5Cuc655%22%5D`,
        '_gat_gtag_UA_46679784_1': `1`

    }

}


async function moreData() {

    try {

        var moreReq = await axiosModule.post(`https://www.diningcode.com/2018/ajax/review.php`,moreConfig);
        console.log(moreReq)
        var moreItemData = await cheerioModule.load(moreReq[`data`]);

        var moreDiningItem = await moreItemData(`#div_review_realtime`)


        // var moreTitleList = await more(moreDiningItem).find(`div.img-grade.button`)

        console.log(moreDiningItem.text())

    } catch (err) {
        console.log(err)
    }
}

async function startProcess() {
    // await getDiningcodeData()
    await moreData();
}

startProcess()

