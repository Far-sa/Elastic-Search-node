const router = require('express').Router()

router.get('/', (req, res) => {
  return res.render('pages/index', {
    message: 'HEY'
  })
})

module.exports = router
