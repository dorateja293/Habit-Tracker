const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const habitController = require('../controllers/habitController');

router.get('/', auth, habitController.getAllHabits);
router.post('/', auth, habitController.createHabit);
router.put('/:id', auth, habitController.editHabit);
router.delete('/:id', auth, habitController.deleteHabit);
router.post('/:id/complete', auth, habitController.completeHabit);
router.get('/:id/progress', auth, habitController.getHabitProgress);

module.exports = router;