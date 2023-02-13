const express = require('express')
const router = express.Router()
const {scrapPageToBullions} = require('./scraper/index')
const getHtmlPage = require('../../../lib/utils')
const {HOST_URL} = require('./config')

router.get('/silver', async (req, res, next) => {
    let page
    try {
        page = await getHtmlPage(HOST_URL + '/srebro/srebrne-monety-bulionowe/')
    } catch (err) {
        next(err)
    }
    const result = scrapPageToBullions(page)
    res.send(result)
})

router.get('/gold', async (req, res, next) => {
    let page
    try {
        page = await getHtmlPage(HOST_URL + '/zloto/zlote-monety-bulionowe/')
    } catch (err) {
        next(err)
    }
    const result = scrapPageToBullions(page)
    res.send(result)
})

module.exports = router