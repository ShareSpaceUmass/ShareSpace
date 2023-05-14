const express = require('express'); // Web framework for Node.js
const router = express.Router(); // Creates an instance of an Express Router
const { markRead } = require('../controllers/messagesController') // Import markRead function from messagesController

router.post('/markRead', markRead); // Define the markRead route and its corresponding controller function

module.exports = router; // Export the router instance for use in the main app.