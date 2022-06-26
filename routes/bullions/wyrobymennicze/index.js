const express = require('express')
const router = express.Router()

const {getBullions} = require('./api')

const getBullionsFromPage = async(url) => {
    let counter = 0
    const result = []
    let bullions = []
    try {
        do {
            bullions = await getBullions(url,{
                counter,
                'filter_traits[510]': '481',
                'filter_availability': 'y',
            })
            if (bullions?.length) {
                result.push(...bullions)
            }
            counter++
        } while (bullions.length > 0)
        return result
    } catch (err) {
        console.error(err)
    }
}

router.get('/silver', async (req, res, next) => {
    const result = await getBullionsFromPage('/pol_m_Srebrne-monety-398.html')
    res.send(result)
})

router.get('/gold', async (req, res, next) => {
    const result = await getBullionsFromPage('/pol_m_Zlote-monety-397.html')
    res.send(result)
})

module.exports = router
