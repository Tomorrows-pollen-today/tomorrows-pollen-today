const request = require('request-promise-native')

async function getPollenTypes () {
  try {
    return await request({
      method: 'GET',
      uri: `${process.env.YESTERDAYS_POLLEN_URL}/api/pollentype`,
      json: true
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = async function (req, res, next) {
  res.locals.pollenTypes = await getPollenTypes()
  next()
}
