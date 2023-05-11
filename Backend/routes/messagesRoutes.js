const express = require('express');
const router = express.Router();
const { markRead, getAllMessages, addMessage } = require('../controllers/messagesController')

router.post('/markRead', markRead);
router.get('/getAllMessages', getAllMessages);
router.post('/addMessage', addMessage);

module.exports = router;