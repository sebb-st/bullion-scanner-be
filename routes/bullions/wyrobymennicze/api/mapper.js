const cheerio = require('cheerio')
const {WB_HOST} = require('./config')

const priceRegex = /^[0-9 ]+,[0-9]+/
const mapResponseToBullions = (page) => {
    const result = []
    const $ = cheerio.load(page)
    $('#search .product .product__sub').each((i, v) => {
        const name = $(v).find('.product__name').text()
        const priceMatch = $(v).find('.product__prices').text().match(priceRegex)
        const price = priceMatch ? priceMatch[0] : null
        const imageURL = WB_HOST + $(v).find('.product__icon img')[0].attribs['data-src']

        if (name && price && imageURL) {
            result.push({
                name,
                price,
                imageURL
            })
        }
    })
    return result
}

module.exports = mapResponseToBullions