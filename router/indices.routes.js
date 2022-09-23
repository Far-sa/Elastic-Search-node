const router = require('express').Router()

const indicesController = require('../controller/indicesController')

router.post('/create', indicesController.createNewIndex)

module.exports = router
