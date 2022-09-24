const router = require('express').Router()

const indicesController = require('../controller/indicesController')

router.get('/list', indicesController.getIndices)
router.post('/create', indicesController.createNewIndex)
router.delete('/delete/:indexName', indicesController.removeIndex)

module.exports = router
