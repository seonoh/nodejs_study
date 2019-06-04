let axiosModule = require('axios')

const JEJU_MAIN_URL = 'https://api.visitjeju.net/api/contents/list?_siteId=jejuavj&locale=kr&device=mobile&cate1cd=cate0000000002&sorting=likecnt+desc&region2cd=&pageSize=6&page=1'

let createConfg = (url)=>{
    let config = {
        'url':url,
        'method':'get',
        'headers': {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            'Content-type': 'application/json;charset=UTF-8',
            'Cookie' : 'iceJWT=SDP+eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBbm9ueW1vdXMiLCJhdWQiOiI3ZWEzYTI3Mi1hODM5LTRhMjgtYTRiMy0zZWUwM2IzNmYzYTIiLCJqdGkiOiI3ZWEzYTI3Mi1hODM5LTRhMjgtYTRiMy0zZWUwM2IzNmYzYTIiLCJpc3MiOiJJLU9OIiwiaWF0IjoxNTU5NjMwNTMzLCJleHAiOjE1NTk3Mzg1MzN9.UVMePGriXZRf7ZxIC60xdRR7E1DdW4VfsIsQKtTHossjGoSwsxZuQo99n7kTYCr64YnW4mesY88vHTx52DmVGA'
        }
    }
    return config;
}
    


const startJejuCrawaling = async()=>{
    let result = ''
    try{
        result = await axiosModule(createConfg(JEJU_MAIN_URL))
    }catch(err){
        console.log(err)
    }

    console.log(result['data'])
}

startJejuCrawaling()