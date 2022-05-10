const express = require('express')
const router = express.Router()
const getBullions = require('./api')

router.get('/wyrobymennicze/silver', async (req, res, next) => {
    const result = await getBullions()
    res.send(result)
})

module.exports = router
