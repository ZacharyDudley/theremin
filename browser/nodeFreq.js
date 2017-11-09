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
