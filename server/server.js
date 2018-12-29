const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http  = require('http');
const publicpath = path.join(__dirname , '../public');
const port  = process.env.PORT || 3000;
var  {generateMessage,generateLocationMessage} = require('./utils/message');
var  {isRealString}  = require('./utils/validation');
var {Users}   = require('./utils/users');
var users = new Users();

var app    = express();
var server = http.createServer(app);
var io     = socketIO(server);

app.use(express.static(publicpath));

io.on('connection' , (socket)=>{
  console.log("New user connected");


socket.on('join' , function(params , callback ){
    if(!isRealString(params.name) || !isRealString(params.room)){
      return  callback("Name and Room name are required.");
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id , params.name , params.room );

    io.to(params.room).emit('updateUserList' , users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Wellcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    callback();

});



socket.on('createMessage',(message , callback)=>{
    console.log("Created message",message);
    io.emit('newMessage',generateMessage(message.from , message.text));
   // socket.broadcast.emit('newMessage',generateMessage(message.from , message.text));
   callback();
});

socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage' , generateLocationMessage('Admin' , coords.latitude , coords.longitude));
});

socket.on('disconnect',()=>{
  var user = users.removeUser(socket.id);
  
  if(user){
      io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
  }
});

});



server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});











