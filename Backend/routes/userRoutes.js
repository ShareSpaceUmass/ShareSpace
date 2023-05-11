const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserData, deleteUser, deleteAllUsers, getUser, getAllUsers, userCompletedPreferences, getAllMessages, addMessage } = require('../controllers/userController')

const multer = require('multer'); 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/updateUser', upload.single('image'), updateUserData);
router.delete('/deleteUser', deleteUser);
router.delete('/deleteAllUsers', deleteAllUsers);
router.get('/getUser', getUser);
router.get('/getAllUsers', getAllUsers);
router.get('/userCompletedPreferences', userCompletedPreferences);
router.get('/getAllMessages', getAllMessages);
router.post('/addMessage', addMessage);


module.exports = router;