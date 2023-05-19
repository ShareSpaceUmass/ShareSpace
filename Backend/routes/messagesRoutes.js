const express = require('express'); // Web framework for Node.js
const router = express.Router(); // Creates an instance of an Express Router
const { markRead, getAllMessages, addMessage } = require('../controllers/messagesController') // Import message functions from messagesController

router.post('/markRead', markRead); // Define the markRead route and its corresponding controller function
router.get('/getAllMessages', getAllMessages); // Route to get all messages
router.post('/addMessage', addMessage); // Route to add a new message


module.exports = router; // Export the router instance for use in the main app.