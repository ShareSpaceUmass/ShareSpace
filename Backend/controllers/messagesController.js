// Import models for User and Message
const { Users } = require('../models');
const { Messages } = require('../models');
const { Server } = require("socket.io"); // Importing Server class from the socket.io library

const server = http.createServer(app); // Creating the HTTP server using the express app
const io = new Server(server, { cors: { origin: "*"}}); // Creating the Socket.io server
const dotenv = require('dotenv').config(); // import the dotenv library for loading environment variables from a .env file

// Setting up a route for the home page and sending Chat.js file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../../Frontend/pages/Chat.js');
});
  
// Starting the server and logging a message when server is started
server.listen(3000, () => {
    console.log('listening on *:3000');
});

let userList = []
// Event listener for when a user connects to the Socket.io server
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
  