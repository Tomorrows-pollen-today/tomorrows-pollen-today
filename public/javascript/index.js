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
    resultContainer.style.cssText = `height: ${result * 2}px;`
    var resultBar = resultContainer.querySelector('.bar')
    resultBar.style.cssText = 'animation: rise 5s ease;'
    var pollenValueElement = resultBar.querySelector('.pollen-value')
    pollenValueElement.innerHTML = Math.round(result * 100) / 100
    pollenValueElement.style.cssText = 'animation: rise-text 5s ease;'
  })
  .catch((error) => {
    console.error(error)
  })
