
// Import required dependencies
const express = require('express'); // Web framework for Node.js
const router = express.Router(); // Creates an instance of an Express Router
const { registerUser, loginUser, updateUserData, deleteUser, deleteAllUsers, getUser, getAllUsers, userCompletedPreferences } = require('../controllers/userController') // Import user controller functions

const multer = require('multer'); // Multer middleware for handling multipart/form-data
const storage = multer.memoryStorage() // Create memory storage engine to store files as Buffer objects
const upload = multer({ storage: storage }) // Create multer instance for handling file uploads with the memory storage engine

// Define routes and their corresponding controller functions
router.post('/', registerUser); // Route to register a new user
router.post('/login', loginUser); // Route to register a new user
router.post('/updateUser', upload.single('image'), updateUserData); // Route to update a user's information with a profile picture upload
router.delete('/deleteUser', deleteUser); // Route to delete a user account
router.delete('/deleteAllUsers', deleteAllUsers); // Route to delete all user accounts
router.post('/getUser', getUser); // Route to get a user's information
router.get('/getAllUsers', getAllUsers); // Route to get information on all users
router.get('/userCompletedPreferences', userCompletedPreferences); // Route to get checks if a user has completed their preferences


module.exports = router; // Export the router instance for use in the main app.
