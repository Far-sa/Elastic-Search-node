const express = require('express')

const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT
const expressEjsLayouts = require('express-ejs-layouts')

//* Configurations
app.use(express.static())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//* view engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', './layouts/master')
