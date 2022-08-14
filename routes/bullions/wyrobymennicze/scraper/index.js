const cheerio = require('cheerio')
const {HOST_URL} = require('../config')

const scrapPageToBullions = (page) => {
    const result = []
    const $ = cheerio.load(page)
    $('#search .product .product__sub').each((i, v) => {
        const name = $(v).find('.product__name').text()
        const priceMatch = $(v).find('.product__prices').text().match(/^[0-9 ]+,[0-9]+/)
        const price = priceMatch ? priceMatch[0].replace(' ', '') : null
        const imageURL = HOST_URL + $(v).find('.product__icon img')[0].attribs['data-src']

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

module.exports = {
    scrapPageToBullions
}