let AudioContext = window.AudioContext || window.webkitAudioContext
let ac = new AudioContext()
let gainNode = ac.createGain()
let ther = ac.createOscillator()

ther.connect(gainNode)
gainNode.connect(ac.destination)

var gain = 0.05
var tone = 5000
var toneMax = 10000
var toneMin = 1000

ther.start()
ac.suspend()
ther.frequency.value = tone
gainNode.gain.value = gain

window.addEventListener('devicelight', function(event){
  let light = event.value
  let lightMod = Math.pow(1.003, light)
  console.log(light, '/', lightMod)
  // ther.frequency.value = event.value * 1000
  ther.frequency.value = light
})

window.addEventListener('keydown', function(event){
  // START & STOP | Z
  if (event.keyCode === 90) {
    if (ac.state === 'running') {
      ac.suspend()
    } else if (ac.state === 'suspended') {
      ac.resume()
    }
  }

  // // VOLUME UP | UP ARROW
  // if (event.keyCode === 38) {
  //   gain += 0.01
  // }

  // // VOLUME DOWN | DOWN ARROW
  // if (event.keyCode === 40) {
  //   gain -= 0.01
  // }

  // // PITCH UP | RIGHT ARROW
  // if (event.keyCode === 39) {
  //   tone += 100
  // }

  // // PITCH DOWN | LEFT ARROW
  // if (event.keyCode === 37) {
  //   tone -= 100
  // }

  // gainNode.gain.value = gain
  // ther.frequency.value = tone
})

console.log(gainNode.gain.value)
console.log(ther.frequency.value)
