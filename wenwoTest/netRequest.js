let axiosModule = require('axios')

let tryCnt = 0;

exports.networkTestRequest = async(url)=>{
    let result = '';

    try {
        result = await axiosModule(url)

    } catch (err) {
        console.log(`networkRequest ERROR --->> ${err}`)
    }

    return result;
}

exports.networkGetRequest = async(url)=>{
    let result = '';

    try {
        result = await axiosModule(url)

    } catch (err) {
        console.log(`networkRequest ERROR --->> ${err}`)
    }

    return result['data'];
}

exports.networkPostRequest = async (url, config) => {
    let result = '';

    try {
        result = await axiosModule.post(url, config)

    } catch (err) {
        
        console.log(`networkRequest ERROR --->> ${err}`)
    }

    return result['data'];

}

exports.useConfigRequest = async (config) => {
    let result = '';

    try {
        result = await axiosModule(config)

    } catch (err) {
        console.log(`useConfigRequest ERROR ===> ${err}`)
    }

    return result['data'];

}


exports.translateLangRequest = async (config) => {
    console.log(config)
    let result = ''

    try {
        result = await axiosModule(config)
        // console.log(result)

    } catch (err) {

        console.log(err)

    }

    return result['data']['text'];

}




