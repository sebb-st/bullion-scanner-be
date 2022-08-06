const express = require('express')
const router = express.Router()
const {getBullionsForPageUrl} = require('./scraper')

router.get('/silver', async (req, res, next) => {
    const result = await getBullionsForPageUrl('/srebro/srebrne-monety-bulionowe/')
    res.send(result)
})

// TODO implement route for gold bullion

module.exports = router