fetchPollen(0, 0)
  .then((result) => {
    // An abitrary value to make the bar scale better
    const maxPollenCount = 200
    document.getElementById('animation-container').style.display = 'none'
    var resultContainer = document.getElementById('result-container')
    resultContainer.style.cssText = ''
    var resultBar = resultContainer.querySelector('.bar')
    resultBar.style.cssText = 'animation: bar 1.5s ease;'
    resultBar.style.setProperty('--bar-height', `${result.predictedPollenCount / maxPollenCount * 100}%`)
    var pollenValueElement = resultContainer.querySelector('.pollen-value')
    if (result.predictedPollenCount <= 1) {
      pollenValueElement.innerHTML = `${String.fromCodePoint('0X1F44C')}<br>All Clear`
    } else {
      pollenValueElement.innerHTML = Math.round(result.predictedPollenCount * 100) / 100
    }
  })
  .catch((error) => {
    console.error(error)
  })

/**
 * Fetches the predicted pollen count for tomorrow for the given pollen type and location.
 * @param  {number} pollenType The type of pollen to get a prediction for.
 * @param  {number} location   The location to get a prediction for.
 * @return {Promise}           A promise object that is resolved with an object containing the predicted
 *                             pollen count as well as the location.
 */
async function fetchPollen (pollenType, location) {
  let requestUrl = new URL(window.location)
  requestUrl.pathname = '/api/pollen'
  requestUrl.search = new URLSearchParams({
    pollenType: pollenType,
    location: location
  })
  let response = await window.fetch(requestUrl)
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(response.statusText)
}
