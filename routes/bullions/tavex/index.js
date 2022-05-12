const express = require('express')
const router = express.Router()

router.get('/silver', async (req, res, next) => {
    let result = 'TO DO'
    res.send(result)
})

module.exports = router