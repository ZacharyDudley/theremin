const express = require('express');
const app = express();
const socketio = require('socket.io')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/');

const server = app.listen(3000, function(){
  console.log('Listening');
});

const io = socketio(server)

io.on('connect', socket => {
  let greet = 'CONNECTED: ' + socket.id
  console.log(greet)
  socket.emit('greet', greet)


  socket.on('callFreq', id => {
    console.log('FREQ is ', id)
    socket.broadcast.emit('assignFreq', id)
  })

  socket.on('callAmp', id => {
    console.log('AMP is ', id)
    socket.broadcast.emit('assignAmp', id)
  })

  socket.on('light', (fromWho, light) => {
    console.log(light, fromWho, socket.id)
    socket.broadcast.emit('gain', light)
  })

  socket.on('shout', message => {
    socket.emit('update', ['EMIT', socket.id, message])
    socket.broadcast.emit('update', ['BROADCAST', socket.id, message])
  })
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', router);

