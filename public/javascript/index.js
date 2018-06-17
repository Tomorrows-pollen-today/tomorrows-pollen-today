window.fetch('api/pollen')
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.statusText)
  })
  .then((result) => {
    document.getElementById('animation-container').style.display = 'none'
    var resultContainer = document.getElementById('result-container')
    resultContainer.style.cssText = ''
    var resultBar = resultContainer.querySelector('.bar')
    resultBar.style.cssText = 'animation: bar 1.5s ease;'
    resultBar.style.setProperty('--bar-height', `${result * 2}px`)
    var pollenValueElement = resultBar.querySelector('.pollen-value')
    pollenValueElement.innerHTML = Math.round(result * 100) / 100
  })
  .catch((error) => {
    console.error(error)
  })
