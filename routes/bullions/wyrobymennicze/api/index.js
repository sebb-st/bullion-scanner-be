const {default: axios} = require('axios')
const {WB_HOST} = require('./config')
const mapResponseToBullions = require('./mapper')

const getBullions = async (url, params) => {
    try {
        const response = await axios.get(WB_HOST + url, {
            responseType: 'text/html',
            params
        })
        return mapResponseToBullions(response.data)
    } catch (error) {
        console.error(error)
    }
    return null
}

module.exports.getBullions = getBullions