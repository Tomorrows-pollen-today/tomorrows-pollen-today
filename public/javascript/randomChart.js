const bars = document.getElementsByClassName('animated-bar')

for (let i = 0; i < bars.length; i++) {
  setRandomAnimationTime(bars[i])
}

function setRandomAnimationTime (element) {
  const animationTime = getRandomTime(0.5, 2)
  element.style.setProperty('--animation-time', animationTime + 's')
}

function getRandomTime (min, max) {
  return Math.random() * (max - min) + min
}
