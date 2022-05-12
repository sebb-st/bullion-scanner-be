const cheerio = require('cheerio')
const {WB_HOST} = require('./config')
const mapResponseToBullions = (response) => {
    const result = []
    const $ = cheerio.load(response.data)
    $('#search .product .product__sub').each((i, v) => {
        result.push({
            name: $(v).find('.product__name').text(),
            price: $(v).find('.product__prices').text(),
            imageURL: WB_HOST + $(v).find('.product__icon img')[0].attribs['data-src']
        })
    })
    return result.filter(bullion=>bullion.price.includes('szt.')) // 'szt.' indicates bullions with exact cost per piece
}

module.exports = mapResponseToBullions