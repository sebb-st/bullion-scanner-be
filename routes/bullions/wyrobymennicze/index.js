const express = require('express')
const router = express.Router()

const {scrapPageToBullions} = require('./scraper')
const getHtmlPage = require('../../../lib/utils')
const {HOST_URL} = require('./config')

const getBullionsForUrl = async (url) => {
    const result = []
    let counter = 0
    let bullions = []
    do {
        const page = await getHtmlPage(url, {
            counter,
            'filter_traits[510]': '481',
            'filter_availability': 'y',
        })
        bullions = scrapPageToBullions(page)
        if (bullions?.length) {
            result.push(...bullions)
        }
        counter++
    } while (bullions.length > 0)
    return result
}

router.get('/silver', async (req, res, next) => {
    try {
        const result = await getBullionsForUrl(HOST_URL + '/pol_m_Srebrne-monety-398.html')
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.get('/gold', async (req, res, next) => {
    try {
        const result = await getBullionsForUrl(HOST_URL + '/pol_m_Zlote-monety-397.html')
        res.send(result)
    } catch (err) {
        next(err)
    }
})

module.exports = router
