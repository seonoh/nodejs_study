let axiosModule = require('axios');
let cheerioModule = require('cheerio');

var mangoConfig = {
    headers: {

        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.mangoplate.com'
       
    }
}


async function test(item) {

    await getDetailItem(item);
} 

const getMangoPlateData = async () => {
    try {

        var data = await axiosModule('https://www.mangoplate.com/search/%EB%AA%85%EB%8F%99?keyword=%EB%AA%85%EB%8F%99&page=1', mangoConfig);

        var $ = await cheerioModule.load(data['data']);

        $test = $(`body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li`);

        // console.log(`@#@#@#@## ${$test.text()}`);
        // body > main > article > div.column-wrapper > div > div > section > div.search-list-restaurants-inner-wrap > ul > li:nth-child(2) > div:nth-child(1) > figure > figcaption > div > a > h2
            $test.each(async function (i, item) {
                $title = $(item).find(`div.list-restaurant-item`);


                await $title.each(async function(i,item){
                    finalTitle = $(item).find(`.title`).text();
                    $rank = $(item).find(`figure > figcaption > div > strong`).text()
                    $href = $(item).find(`figure > figcaption > div > a`).attr('href');

                    let mangoItem = await new MangoItem( $title ,$rank, $href );

                    console.log(`title : ${finalTitle} rank : ${$rank} href : ${$href}`)

                    var testResult = await test(mangoItem);


                })

            
            });

    } catch (err) {
        console.log(err);
    }
}

function MangoItem(title, rank, href){
    this.title = title;
    this.rank = rank;
    this.href = href;
}

const getDetailItem = async(mangoItem) =>{

    console.log(`넘어온 값 : ${mangoItem.href}`)

    try {
        await  console.log(`https://www.mangoplate.com${mangoItem.href}`)
        let result = await axiosModule(`https://www.mangoplate.com${mangoItem.href}`, mangoConfig);

        

        // console.log(result)
        _ = await cheerioModule.load(result['data']);

        // console.log(_)

        _detail = await _('body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table > tbody> tr.only-desktop');
        // // body > main > article > div.column-wrapper > div.column-contents > div > section.restaurant-detail > table > tbody > tr:nth-child(1) > td
        await _detail.each(async function(i, item){
            // await console.log(item[`children`]);
        })



        

        //  _detail.each(async function(i,item){
            // console.log("여기여기 잘탄다.  "+i )
            // address = _(item).find('tr.only-desktop');

            // a = _(address).find('th');
            // console.log(a);
            // a.each(function(i,item){
            //     console.log(item);
            // })
            // await console.log(address.text())

            // console.log(`${mangoItem.title}`);
            // console.log(` 별점 : ${mangoItem.rank}\n`);
            
            // await console.log(` 주소 : ${address.text()}\n`);

        // })
        

    
    }catch(err){
        console.log(err);
    }
}

getMangoPlateData();