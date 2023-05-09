const express = require('express');
const router = express.Router();
const { markRead } = require('../controllers/messagesController')

router.post('/markRead', markRead);

module.exports = router;