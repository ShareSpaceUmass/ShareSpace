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


 // @desc Handles the connection event when a user connects to the server via socket.
 //
 // @param socket - The socket object representing the connection.

io.on('connection', (socket) => {
    console.log('a user connected');
    //TODO
    let userEmail;
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
      res.send(messages);
    } catch (err) {
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
      const message = {
        senderEmail: req.body.senderEmail,
        receiverEmail: req.body.receiverEmail,
        content: req.body.conten,
        read: false
      };
  
      await Messages.create(message);
      res.status(200).json({ message: "User message added succesfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while adding user preferences." });
    }
  };


  module.exports = {
    markRead,
    getAllMessages,
    addMessage
  };
  