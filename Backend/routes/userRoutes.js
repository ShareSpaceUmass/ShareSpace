const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserData, deleteUser, deleteAllUsers, getUser, getAllUsers, userCompletedPreferences } = require('../controllers/userController')

const multer = require('multer'); 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/updateUser', upload.single('image'), updateUserData);
router.delete('/deleteUser', deleteUser);
router.delete('/deleteAllUsers', deleteAllUsers);
router.post('/getUser', getUser);
router.get('/getAllUsers', getAllUsers);
router.get('/userCompletedPreferences', userCompletedPreferences);



module.exports = router;