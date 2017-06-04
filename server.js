const express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var colorHistory = [];
io.on('connection', function(socket){

  if (colorHistory.length){
    colorHistory.forEach(function(color){
      io.emit('newPaint', color)
    })
  }

  console.log(`user ${socket.id} connected`);

  socket.on('color', function(event){
    console.log('Painted:', event.i, event.j, event.color);
    colorHistory.push(event);
    io.emit('newPaint', event);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.use(express.static('public'));

server.listen(3000, function(){
  console.log('listening on *:3000');
});
