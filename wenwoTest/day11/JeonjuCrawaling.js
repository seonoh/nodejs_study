//전통문화 http://tour.jeonju.go.kr/index.9is?contentUid=9be517a753b598650153eae96c935f36

let axiosModule = require('axios')
let cheerioModule = require('cheerio');

const getJeonJuData = async () => {
    let result = '';

    try {
        result = await axiosModule({
            url: 'http://tour.jeonju.go.kr/index.9is?contentUid=9be517a753b598650153eae96c935f36',
            method: 'get',

            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        let ci = cheerioModule.load(result['data'])
        let itemList = ci('#image_board').find('div.image_board_list')

        for(var i=0; i<itemList.length; i++){
            console.log(ci(itemList[i]).find('ul > li > ul.image_board_image > li > a').attr('href'))
        }

    } catch (err) {
        console.log(err)
    }

    
}

getJeonJuData()