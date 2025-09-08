const Habit = require('../models/Habit');
const HabitCompletion = require('../models/HabitCompletion');

exports.getAllHabits = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { userId: req.user };
    if (category) {
      query.category = category;
    }
    const habits = await Habit.find(query);
    res.json(habits);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createHabit = async (req, res) => {
  const { name, category, tags, frequency } = req.body;
  try {
    const newHabit = new Habit({ userId: req.user, name, category, tags, frequency });
    const habit = await newHabit.save();
    res.status(201).json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editHabit = async (req, res) => {
  const { name, category, tags, frequency } = req.body;
  try {
    let habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ msg: 'Habit not found' });
    }
    habit.name = name;
    habit.category = category;
    habit.tags = tags;
    habit.frequency = frequency;
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ msg: 'Habit not found' });
    }
    await habit.deleteOne();
    await HabitCompletion.deleteMany({ habitId: req.params.id });
    res.json({ msg: 'Habit removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.completeHabit = async (req, res) => {
  const habitId = req.params.id;
  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ msg: 'Habit not found' });
    }
    
    // Check if the habit has already been completed today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    
    const existingCompletion = await HabitCompletion.findOne({
      habitId,
      userId: req.user,
      date: { $gte: startOfToday, $lte: endOfToday }
    });
    
    if (existingCompletion) {
      return res.status(400).json({ msg: 'Habit already completed today' });
    }
    
    // Create a new completion record
    const completion = new HabitCompletion({ habitId, userId: req.user, date: new Date() });
    await completion.save();
    
    res.json(completion);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getHabitProgress = async (req, res) => {
  try {
    const completions = await HabitCompletion.find({
      habitId: req.params.id,
      userId: req.user,
    }).sort({ date: -1 });

    let streak = 0;
    if (completions.length > 0) {
      let sortedCompletions = completions.map(c => new Date(c.date).toISOString().slice(0, 10));
      let uniqueDates = [...new Set(sortedCompletions)];
      
      let currentDate = new Date();
      for (let i = 0; i < uniqueDates.length; i++) {
        const completionDate = new Date(uniqueDates[i]);
        if (completionDate.toDateString() === currentDate.toDateString() || completionDate.toDateString() === new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString()) {
          streak++;
          currentDate = completionDate;
        } else {
          break;
        }
      }
    }
    res.json({ streak, completions });
  } catch (err) {
    res.status(500).send('Server error');
  }
};