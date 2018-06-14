const express = require('express')
const router = express.Router()

router.get('/', async function (req, res, next) {
  res.render('index', {
    title: `Tomorrow's Pollen Today`
  })
})

module.exports = router
