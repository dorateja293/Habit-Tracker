const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

router.post('/send', auth, notificationController.sendDailyReminders);

module.exports = router;
