import lux from './lux'

const socket = io(window.location.origin)
const prompt = document.getElementById('prompt')
const iam = document.getElementById('role')
const light = lux()
let roles = {
  freq: '',
  amp: ''
}

socket.on('connect', () => {
  console.log('THIS IS CLIENT: ', socket.id)

  /*  WHICH USER IS FREQ AND WHICH IS AMP */
  window.addEventListener('keydown', event => {
    if (event.keyCode === 81 && roles.freq === '' && roles.amp !== socket.id) {
      /*  PRESS 'q' TO BE FREQ  */
      socket.emit('callFreq', socket.id)
      console.log('I call FREQ')
    } else if (event.keyCode === 80 && roles.amp === '' && roles.freq !== socket.id) {
      /*  PRESS 'p' TO BE AMP */
      socket.emit('callAmp', socket.id)
      console.log('I call AMP')
    }
  })

  socket.on('assignFreq', id => {
    roles.freq = id
    console.log(roles)

  })

  socket.on('assignAmp', id => {
    roles.amp = id
    console.log(roles)

  })

  if (roles.freq === socket.id) {
    console.log('I AM FREQ')
    iam.innerHTML = 'I AM FREQ'
  }
  if (roles.amp === socket.id) {
    console.log('I AM AMP')
    iam.innerHTML = 'I AM AMP'
  }
})
