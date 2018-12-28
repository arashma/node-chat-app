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
 


socket.on('createMessage',(message)=>{
    console.log("Created message",message);
    io.emit('newMessage',{
        from:message.from,
        text:message.text,
        createdAt: new Date().getTime()
    });
})

});



server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})
