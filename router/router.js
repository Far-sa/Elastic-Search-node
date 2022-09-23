const router = require('express').Router()

router.get('/', (req, res) => {
  return res.render('pages/index', {
    message: 'HEY'
  })
})

router.use('/index', require('./indices.routes'))

module.exports = router
