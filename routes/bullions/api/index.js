const mapResponseToBullions = require('./mapper')
const {default: axios} = require('axios')
const {WB_HOST, WB_GET_SILVER_BULLION_HTML_URL} = require('./config')

const getBullionsByPageCounter = async (counter) => {
    try {
        const response = await axios.get(WB_HOST + WB_GET_SILVER_BULLION_HTML_URL, {
            responseType: 'document',
            params: {
                'filter_traits[510]': '481',
                'filter_availability': 'y',
                'counter': counter
            }
        })
        return mapResponseToBullions(response)
    } catch (error) {
        console.error(error)
    }
    return null
}

const getBullions = async() => {
    let counter = 0
    let result = []
    let bullions = []
    do {
        bullions = await getBullionsByPageCounter(counter)
        result = result.concat(bullions)
        counter++
    } while (bullions.length > 0)
    return result
}

module.exports = getBullions