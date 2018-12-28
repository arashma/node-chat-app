const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http  = require('http');
const publicpath = path.join(__dirname , '../public');
const port  = process.env.PORT || 3000;
var  {generateMessage,generateLocationMessage} = require('./utils/message');
var app    = express();
var server = http.createServer(app);
var io     = socketIO(server);

app.use(express.static(publicpath));

io.on('connection' , (socket)=>{
  console.log("New user connected");
  socket.on('disconnect',()=>{
    console.log("User was disconnected");
});

socket.emit('newMessage',generateMessage('Admin','Wellcome to chat app'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

socket.on('createMessage',(message , callback)=>{
    console.log("Created message",message);
    io.emit('newMessage',generateMessage(message.from , message.text));
   // socket.broadcast.emit('newMessage',generateMessage(message.from , message.text));
   callback('This is from the server.');
});

socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage' , generateLocationMessage('Admin' , coords.latitude , coords.longitude));
});

});



server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});











