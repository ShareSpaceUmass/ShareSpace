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

let userList = [] //stores logged in users

 // @desc Event listener for when a user connects to the Socket.io server
 //
 // @param socket - The socket object representing the connection.
io.on('connection', (socket) => {
    //NOTE: incomplete implementation, need to integrate and test still
    console.log('a user connected');
    let userEmail = socket.handshake.auth.email;
    let history;
    getAllMessages(userEmail, history);
    
    //get from database specified for logged in user, should be in order from the top, each history will have a marker if unread or not
    socket.emit("history", history)

    //store current socket.id in userList with key as username
    userList[userEmail] = socket.id;

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userList[userEmail];
    });

    //sending message
    socket.on('send', (data) => {
        if(data.target in userList) { // if the target is logged in
            //Update database with new message, including unread for target

            let id = userList[data.target];
            socket.broadcast.to(id).emit('recieve', data.text) //sends to frontend of specified user
            socket.broadcast.to(socket.id).emit('recieve', data.text) //data should store this is a message to self so we can display properly
        }
        else {  //target is not logged in
            //Update database with new message, including unread for target
            socket.broadcast.to(socket.id).emit('recieve', data) //data should store this is a message to self so we can display properly
        }
    })
});

  // @desc   Edits a message to be marked as read
  // @route  POST /markRead
  // @access Private
const markRead = async (req,res) => {
    //mark most recent message as read in database given the two users
    try {
      const readMessage = Messages.findOne({
        where: { 
          senderEmail: req.body.senderEmail,
          recieverEmail: req.body.recieverEmail,
        },
        order: [ 
          [ 'createdAt', 'DESC' ]
        ],
      });
      readMessage.read = true;

    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching all unread messages." });
    }
}
  
// @desc   Get all of a user's messages, sorted by most recent
// @route  GET /getAllMessages
// @access Private
const getAllMessages = async (req, res) => {
  // Find all unread messages sent by the specified senderEmail and sort them by most recent
  try {
    const unreadMessages = await Messages.findAll({
      where: {
        senderEmail: req.body.senderEmail,
        read: false
      },
      order: [
        ['updatedAt', 'DESC']
      ]
    });
    // Send all unread messages to the client
    res.send(messages);
  } catch (err) {
    // Handle any errors that occur while retrieving messages
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching all unread messages." });
  }
};
  
// @desc   Adds a message to the table
// @route  POST /addMessage
// @access Public
const addMessage = async (req, res) => {
  try {
    // Create a new message with the specified properties
    const message = {
      senderEmail: req.body.senderEmail,
      receiverEmail: req.body.receiverEmail,
      content: req.body.content,
      read: false
    };
    // Add the new message to the database
    await Messages.create(message);
    res.status(200).json({ message: "User message added succesfully" });
  } catch (err) {
    // Handle any errors that occur while adding the new message to the database
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding user message." });
  }
};

// Exporting an object with all the defined functions as properties to make them available to other modules
  module.exports = {
    markRead,
    getAllMessages,
    addMessage
  };
  