const socket = io(window.location.origin)


socket.on('connect', socket => {
  console.log('HI')
})
