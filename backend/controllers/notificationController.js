const nodemailer = require('nodemailer');
const User = require('../models/User');
const Habit = require('../models/Habit');
const HabitCompletion = require('../models/HabitCompletion');

exports.sendDailyReminders = async (req, res) => {
  try {
    const users = await User.find();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    for (const user of users) {
      const habits = await Habit.find({ userId: user._id });
      const reminders = [];

      for (const habit of habits) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const completion = await HabitCompletion.findOne({
          habitId: habit._id,
          userId: user._id,
          date: { $gte: today, $lt: tomorrow }
        });

        if (!completion) {
          reminders.push(habit.name);
        }
      }

      if (reminders.length > 0) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Daily Habit Reminder',
          text: `Hi ${user.name}, don't forget to complete your habits: ${reminders.join(', ')}`
        };

        await transporter.sendMail(mailOptions);
      }
    }

    res.json({ msg: 'Reminders sent' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
