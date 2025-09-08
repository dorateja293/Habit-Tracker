const User = require('../models/User');
const HabitCompletion = require('../models/HabitCompletion');

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().select('name streaks').sort({ streaks: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ msg: 'Search query must be at least 2 characters' });
    }

    const currentUser = await User.findById(req.user);
    const searchRegex = new RegExp(query.trim(), 'i');
    
    const users = await User.find({
      $and: [
        {
          $or: [
            { name: searchRegex },
            { email: searchRegex }
          ]
        },
        { _id: { $ne: req.user } } // Exclude current user
      ]
    })
    .select('name email')
    .limit(10);

    // Add friendship status to each user
    const usersWithStatus = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      isFollowing: currentUser.friends.includes(user._id)
    }));

    res.json(usersWithStatus);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email streaks');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (req.params.id === req.user) {
      return res.status(400).json({ msg: 'Cannot follow yourself' });
    }
    const currentUser = await User.findById(req.user);
    if (currentUser.friends.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Already following this user' });
    }
    currentUser.friends.push(req.params.id);
    await currentUser.save();
    res.json({ msg: 'User followed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getFriendsFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user);
    const friends = currentUser.friends;
    const feed = await HabitCompletion.find({ userId: { $in: friends } })
      .populate('userId', 'name')
      .populate('habitId', 'name')
      .sort({ date: -1 })
      .limit(20);
    res.json(feed);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
