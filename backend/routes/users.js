const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/leaderboard', auth, userController.getLeaderboard);
router.get('/search', auth, userController.searchUsers);
router.get('/:id', auth, userController.getUserProfile);
router.post('/:id/follow', auth, userController.followUser);
router.get('/:id/feed', auth, userController.getFriendsFeed);

module.exports = router;
