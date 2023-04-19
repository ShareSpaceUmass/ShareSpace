const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, getUser, updateUserData, getAllUsers } = require('../controllers/userController')

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/deleteUser/:userId', deleteUser);
router.get('/getUser/:userId', getUser);
router.get('/getAllUsers', getAllUsers)
router.get('/updateUser/:userId/:field/:value', updateUserData)

module.exports = router;