const express = require('express')
const request = require('request-promise-native')
const router = express.Router()

router.get('/pollen', async function (req, res, next) {
  var date = new Date()
  date.setDate(date.getDate() + 1)
  var options = {
    method: 'GET',
    uri: `${process.env.YESTERDAYS_POLLEN_URL}/api/pollen/${date.toISOString()}`,
    json: true
  }
  var result
  try {
    result = await request(options)
  } catch (error) {
    console.error(error)
    res.status(500).send('Unable to retrieve pollen numbers.')
  }
  if (result) {
    res.json(result.PredictedPollenCount)
  }
})

module.exports = router
