const express = require('express')
const request = require('request-promise-native')
const router = express.Router()
const API_KEY = process.env.API_KEY
const PREDICTOR_URL = process.env.PREDICTOR_URL

router.get('/pollen', async function (req, res, next) {
  var options = {
    method: 'POST',
    uri: PREDICTOR_URL,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: 'application/json'
    },
    body: {
      GlobalParameters: {
        'Output_name': ''
      }
    },
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
    res.send(result.Results.predicted_pollen_count.value.Values[0][0])
  }
})

module.exports = router
