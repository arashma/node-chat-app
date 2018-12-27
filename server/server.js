const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http  = require('http');
const publicpath = path.join(__dirname , '../public');
const port  = process.env.PORT || 3000;

var app    = express();
var server = http.createServer(app);
var io     = socketIO(server);

app.use(express.static(publicpath));

io.on('connection' , (socket)=>{
  console.log("New user connected");

  socket.on('disconnect',()=>{
    console.log("User was disconnected");
});
 
socket.emit('newMessage',{
    from:'arash',
    text:'He.whats going on',
    createdAt:123
});

socket.on('createMessage',(message)=>{
    console.log("Created message",message);
})

});



server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})
