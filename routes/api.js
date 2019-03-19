const express = require('express')
const request = require('request-promise-native')
const router = express.Router()

router.get('/pollen', async function (req, res, next) {
  if (!req.query.pollenType || !req.query.location) {
    return res.sendStatus(400)
  }

  var date = new Date()
  date.setDate(date.getDate() + 1)
  var options = {
    method: 'GET',
    uri: `${process.env.YESTERDAYS_POLLEN_URL}/api/pollen/${date.toISOString()}`,
    json: true,
    qs: {
      pollentype: req.query.pollenType,
      location: req.query.location
    }
  }
  var result
  try {
    result = await request(options)
  } catch (error) {
    console.error(error)
    res.status(500).send('Unable to retrieve pollen numbers.')
  }
  if (result) {
    res.json({
      predictedPollenCount: result.PredictedPollenCount,
      city: result.Location.City,
      country: result.Location.Country
    })
  }
})

module.exports = router
