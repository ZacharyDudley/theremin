import lux from './lux'

const socket = io(window.location.origin)
const buttonFreq = document.getElementById('buttonFreq')
const buttonAmp = document.getElementById('buttonAmp')
const roleText = document.getElementById('role')
let light
let lightMod
let roles = {
  freq: '',
  amp: ''
}
let lightFrom

let AudioContext = window.AudioContext || window.webkitAudioContext
let ac = new AudioContext()


socket.on('connect', () => {
  console.log('THIS IS CLIENT: ', socket.id)

  socket.on('update', log => {
    console.log(log)
  })

  window.addEventListener('devicelight', function(event){
    light = event.value
    lightMod = light * 10
    if (roles.freq === socket.id) {
      lightFrom = 'freq'
    } else if (roles.amp === socket.id) {
      lightFrom = 'amp'
    }
  })
  socket.emit('light', lightFrom, lightMod)
  // window.addEventListener('devicelight', function(event){
  //   light = event.value
  //   lightMod = light * 10
  //   console.log(light, '/', lightMod)
  //   socket.emit('light', lightMod)
  // })

  // /*  WHICH USER IS FREQ AND WHICH IS AMP */
  // window.addEventListener('keydown', event => {
  //   if (event.keyCode === 81 && roles.freq === '' && roles.amp !== socket.id) {
  //     /*  PRESS 'q' TO BE FREQ  */
  //     socket.emit('callFreq', socket.id)
  //     console.log('I call FREQ')
  //   } else if (event.keyCode === 80 && roles.amp === '' && roles.freq !== socket.id) {
  //     /*  PRESS 'p' TO BE AMP */
  //     socket.emit('callAmp', socket.id)
  //     console.log('I call AMP')
  //   }
  // })

  document.addEventListener('click', event => {
    if (event.target.id === 'buttonFreq' && roles.amp !== socket.id) {
      socket.emit('callFreq', socket.id)
      buttonFreq.disabled = true
      buttonAmp.disabled = true
    } else if (event.target.id === 'buttonAmp' && roles.freq !== socket.id) {
      socket.emit('callAmp', socket.id)
      buttonFreq.disabled = true
      buttonAmp.disabled = true
    }
  })

  // buttonFreq.addEventListener('click', event => {
  //   if (roles.amp !== socket.id) {
  //     console.log('Clicked FREQ')
  //     buttonFreq.disabled = true
  //     socket.emit('callFreq', socket.id)
  //   }
  // })

  // buttonAmp.addEventListener('click', event => {
  //   if (roles.freq !== socket.id) {
  //     console.log('Clicked AMP')
  //     buttonAmp.disabled = true
  //     socket.emit('callAmp', socket.id)
  //   }
  // })

  socket.on('assignFreq', id => {
    // socket.emit('shout', 'Is Freq')

    roles.freq = id
    buttonFreq.disabled = true
    if (roles.amp === socket.id) {
      roleText.innerHTML = 'Amplitude'
    } else if (roles.freq === socket.id) {
      roleText.innerHTML = 'Frequency'
    }
  })

  socket.on('assignAmp', id => {
    // socket.emit('shout', 'Is Amp')

    roles.amp = id
    buttonAmp.disabled = true
    if (roles.amp === socket.id) {
      roleText.innerHTML = 'Amplitude'
    } else if (roles.freq === socket.id) {
      roleText.innerHTML = 'Frequency'
    }
  })

  socket.on('light', (fromWho, val) => {
    console.log(fromWho, val)
  })

  socket.on('gain', val => {
    if (roles.amp === socket.id) {
      let gainNode = ac.createGain()
      let ther = ac.createOscillator()

      ther.connect(gainNode)
      gainNode.connect(ac.destination)
      ther.start()
      // ther.frequency.value = tone
      gainNode.gain.value = val

    }
  })

})
