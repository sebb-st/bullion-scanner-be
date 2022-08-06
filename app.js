const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const bullionsRouterWB = require('./routes/bullions/wyrobymennicze/index')
const tavexBullionsRouter = require('./routes/bullions/tavex/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/bullions/wyrobymennicze', bullionsRouterWB)
app.use('/bullions/tavex', tavexBullionsRouter)

module.exports = app
