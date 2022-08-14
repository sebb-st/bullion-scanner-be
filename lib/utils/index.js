const {default: axios} = require('axios')
const getHtmlPage = async (url, params) => {
    let response
    try {
        response = await axios.get(url, {
            responseType: 'text/html',
            headers: {'Cache-Control': 'no-cache'},
            params
        })
    } catch (error) {
        console.error(error)
    }
    return response?.data
}

module.exports = getHtmlPage

