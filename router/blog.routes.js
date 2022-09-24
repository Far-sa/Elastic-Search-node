const router = require('express').Router()

const blogController = require('../controller/blogController')

router.post('/create', blogController.createBlog)

module.exports = router
