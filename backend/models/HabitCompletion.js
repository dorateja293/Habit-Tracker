const mongoose = require('mongoose');

const habitCompletionSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('HabitCompletion', habitCompletionSchema);