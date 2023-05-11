const { Users } = require('../models');
const { Messages } = require('../models');
const { Server } = require("socket.io");


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*"}});
const dotenv = require('dotenv').config();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '../../Frontend/pages/Chat.js');
});
  

  
server.listen(3000, () => {
    console.log('listening on *:3000');
});

let userList = []

io.on('connection', (socket) => {
    console.log('a user connected');
    //TODO
    //retrieve message history
    
    //get from database specified for logged in user, should be in order from the top, each history will have a marker if unread or not
    socket.emit("history", history)

    //store current socket.id in userList with key as username

    socket.on('disconnect', () => {
        console.log('user disconnected');
        //set offline 
        //remove socket.id
    });

    //sending message
    socket.on('send', (data) => {
        if(data.target in userList) { // if the target is logged in
            //Update database with new message, including unread for target
            let id = getId(data.target);
            socket.broadcast.to(id).emit('recieve', data) //sends to frontend of specified user
            socket.broadcast.to(socket.id).emit('recieve', data) //data should store this is a message to self so we can display properly
        }
        else {  //target is not logged in
            //Update database with new message, including unread for target
            socket.broadcast.to(socket.id).emit('recieve', data) //data should store this is a message to self so we can display properly
        }
    })
});

const markRead = async (req,res) => {
    //mark most recent message as read in database given the two users
}
  