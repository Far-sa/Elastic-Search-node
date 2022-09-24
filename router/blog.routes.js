const router = require('express').Router()

const blogController = require('../controller/blogController')

router.post('/create', blogController.createBlog)
router.get('/findByTitle', blogController.searchByTitle)
router.get('/multi-fields', blogController.searchByMultiField)
router.get('/regexp-search', blogController.searchByRegexp)
router.get('/list/:value?', blogController.getAllBlog)
router.delete('/delete/:id', blogController.removeBlog)
router.put('/update/:id', blogController.updateBlog)

module.exports = router
