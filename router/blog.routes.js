const router = require('express').Router()

const blogController = require('../controller/blogController')

router.post('/create', blogController.createBlog)
router.get('/list/:value?', blogController.getAllBlog)

module.exports = router
