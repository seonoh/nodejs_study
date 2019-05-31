let axiosModule = require('axios')

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
        console.log(`networkRequest ERROR --->> ${err}`)
    }

    return result['data'];

}




