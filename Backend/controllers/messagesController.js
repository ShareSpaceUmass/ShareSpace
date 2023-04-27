const { Users } = require('../models');
const { Messages } = require('../models');
const { Server } = require("socket.io");


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*"}});
const dotenv = require('dotenv').config();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '../../Frontend/pages/Chat.js');
});
  
io.on('connection', (socket) => {
    console.log('a user connected');
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});

let userList = []

io.on('connection', (socket) => {
    console.log('a user connected');
    //TODO
    //display all stored messages

    //store current status as online
    //store current socket.id in userList

    socket.on('disconnect', () => {
        console.log('user disconnected');
        //set offline 
        //remove socket.id
    });

    //sending message
    socket.on('send', (data) => {
        let id = getId(data.target);
        socket.broadcast.to(id).emit('recieve', data) //sends to frontend of specified user
        socket.broadcast.to(socket.id).emit('recieve', data) //data should store this is a message to self so we can display properly
    })
});
