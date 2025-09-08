const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, enum: [
    'Health', 
    'Fitness', 
    'Study', 
    'Work', 
    'Personal', 
    'Financial', 
    'Hobbies'
  ], required: true },
  tags: [String],
  frequency: { type: String, enum: ['daily', 'weekly'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);