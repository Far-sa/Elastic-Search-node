const express = require('express')
const dotenv = require('dotenv')
const expressEjsLayouts = require('express-ejs-layouts')

const app = express()

//* ENV Configurations
dotenv.config()

//* Configurations
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//* view engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', './layouts/master')

//* lunch Server
const PORT = process.env.PORT || 5000
const server = require('http').createServer(app)
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})
