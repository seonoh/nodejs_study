let axiosModule = require('axios')
let cheerioModule = require('cheerio')

const GANGWON_TOUR_URL = 'http://www.gangwon.to/tour/gangwondo_trip'
const GANGWON_TEMPLESTAY_URL = 'http://www.gangwon.to/tour/gangwondo_trip/templestay'
const GANGWON_FIRM_URL = 'http://www.gangwon.to/tour/go_to_kangwondo/filmingsite'
const GANGWON_ACCOMMODATION_URL = 'http://www.gangwon.to/tour/sightseeing_guide/accommodation'
const GANGWON_INFORMATION_URL = 'http://www.gangwon.to/tour/sightseeing_guide/tourist_information_center'

const config = 
    {
        url: 'http://www.gangwon.to/tour/gangwondo_trip',
        
        method: 'post',
        params: {
            'pageIndex': 'pageNum',
            'mode': "",
            'all': "",
            'all': ""
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
            'Content-type': 'application/x-www-form-urlencoded',
            'Cookie' : 'JSESSIONID=688BB4CADBE6B7155CB78D49C23839DD'
        }
    }




const getTourItemData = async (url, pageNum) => {
    console.log(`pageNum : ${pageNum}`)
    // let tourResult = await axiosModule.post(GANGWON_TOUR_URL,config)
    let tourResult = await axiosModule(config)


    let ci = cheerioModule.load(tourResult['data'])
    // console.log(ci)
    let hrefList = ci('#A-Contents > div > section > section > ul > li')
    console.log(hrefList)
    for (let i = 0; i < hrefList.length; i++) {

        tempTitle =  ci(hrefList[i].find('article > h1'))
        tempHref = `http://www.gangwon.to${ci(hrefList[i]).find('div>a').attr('href')}`
        tempImagePath = `http://www.gangwon.to${ci(hrefList[i]).find('div>a>img').attr('src')}`

        console.log(tempTitle)
    }

}


const startCrawaling = async()=>{
    for (let i = 1; i <= 100; i++) {
        await getTourItemData(GANGWON_TEMPLESTAY_URL, i)
    }
}

startCrawaling()