const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, getUser, updateUserData, getAllUsers } = require('../controllers/userController')

const multer = require('multer'); 

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/deleteUser/:userId', deleteUser);
router.get('/getUser/:userId', getUser);
router.get('/getAllUsers', getAllUsers)
router.post('/updateUser/:userId', upload.single('image'), updateUserData);

module.exports = router;