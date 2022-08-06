const {default: axios} = require('axios')
const {HOST_URL} = require('../../tavex/scraper/config')
const mapResponsePageToBullions = require('../../tavex/scraper/mapper')
const getBullionsForPageUrl = async (url, params) => {
    try {
        const response = await axios.get(HOST_URL + url, {
            responseType: 'text/html',
            params,
            headers: {'Cache-Control': 'no-cache'}
        })
        return mapResponsePageToBullions(response.data)
    } catch (error) {
        console.error(error)
    }
    return null
}
module.exports.getBullionsForPageUrl = getBullionsForPageUrl
