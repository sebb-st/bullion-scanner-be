const express = require('express')
const router = express.Router()
const {scrapPageToBullions} = require('./scraper/index')
const getHtmlPage = require('../../../lib/utils')
const {HOST_URL} = require('./config')

router.get('/silver', async (req, res, next) => {
    const page = await getHtmlPage(HOST_URL + '/srebro/srebrne-monety-bulionowe/')
    const result = scrapPageToBullions(page)
    res.send(result)
})

// TODO implement route for gold bullion

module.exports = router