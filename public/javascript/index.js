window.fetch('api/pollen')
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.statusText)
  })
  .then((result) => {
    // An abitrary value to make the bar scale better
    const maxPollenCount = 200
    document.getElementById('animation-container').style.display = 'none'
    var resultContainer = document.getElementById('result-container')
    resultContainer.style.cssText = ''
    var resultBar = resultContainer.querySelector('.bar')
    resultBar.style.cssText = 'animation: bar 1.5s ease;'
    resultBar.style.setProperty('--bar-height', `${result / maxPollenCount * 100}%`)
    var pollenValueElement = resultContainer.querySelector('.pollen-value')
    if (result <= 1) {
      pollenValueElement.innerHTML = `${String.fromCodePoint('0X1F44C')}<br>All Clear`
    } else {
      pollenValueElement.innerHTML = Math.round(result * 100) / 100
    }
  })
  .catch((error) => {
    console.error(error)
  })
