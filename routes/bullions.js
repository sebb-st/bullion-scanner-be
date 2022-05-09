const express = require('express')
const router = express.Router()
const axios = require('axios').default
const cheerio = require('cheerio')

router.get('/wyrobymennicze/silver', async (req, res, next) => {
    const WB_HOST = 'https://www.wyrobymennicze.pl'
    const WB_GET_SILVER_BULLION_HTML_URL = '/pol_m_Srebrne-monety-398.html?filter_traits[1]=367&filter_pricerange=&filter_traits[510]=481&filter_traits[69]=&filter_traits[304]=&filter_availability='
    let response
    try {
        response = await axios.get(WB_HOST + WB_GET_SILVER_BULLION_HTML_URL, {responseType: 'document'})
    } catch (error) {
        console.error(error)
    }
    const $ = cheerio.load(response.data)
    const result = []
    $('#search .product .product__sub').each((i, v) => {
        result.push({
            name: $(v).find('.product__name').text(),
            price: $(v).find('.product__prices').text(),
            imageURL: WB_HOST + $(v).find('.product__icon img')[0].attribs['data-src']
        })
    })
    result.filter(bullion=>bullion.price.includes('szt.')) // 'szt.' indicates bullions with exact cost per piece
    res.send(result)
})

module.exports = router
