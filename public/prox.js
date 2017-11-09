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


/*  AMBIENT LIGHT CHANGES THE TONE  */
window.addEventListener('devicelight', function(event){
  let light = event.value
  // let lightMod = Math.pow(1.003, light)
  let lightMod = light * 10
  console.log(light, '/', lightMod)
  // ther.frequency.value = event.value * 1000
  ther.frequency.value = light
})

/*  TONE STARTS WHEN 'Z' IS PRESSED AND CONTINUES UNTIL 'Z' IS PRESSED AGAIN  */
  // window.addEventListener('keydown', function(event){
  //   if (event.keyCode === 90) {
  //     if (ac.state === 'running') {
  //       ac.suspend()
  //       console.log('PAUSED')
  //     } else if (ac.state === 'suspended') {
  //       ac.resume()
  //       console.log('PLAYING')
  //     }
  //   }
  // })


/*  TONE PLAYS ONLY WHILE 'Z' IS HELD DOWN  */
  window.addEventListener('keydown', function(event){
    if (event.keyCode === 90) {
        ac.resume()
        console.log('PLAYING')
    }
  })

  window.addEventListener('keyup', function (event) {
    if (event.keyCode === 90) {
      console.log('SUSPEND')
      ac.suspend()
    }
  })


console.log(gainNode.gain.value)
console.log(ther.frequency.value)

