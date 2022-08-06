const cheerio = require('cheerio')
const {WB_HOST} = require('./config')

const priceRegex = /^[0-9 ]+,[0-9]+/
const mapResponsePageToBullions = (page) => {
    const result = []
    const $ = cheerio.load(page)
    $('.v-category__content .product.product--hardcore').each((i, v) => {
        const name = $(v).find('.product__title span').text()
        const priceMatch = $(v).find('.product__table .product__table-row .product__pricelist-value')[1].children[0].data.match(priceRegex)
        const price = priceMatch ? priceMatch[0] : null
        const imageURL = '-' // TODO scrap bullion image

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

module.exports = mapResponsePageToBullions