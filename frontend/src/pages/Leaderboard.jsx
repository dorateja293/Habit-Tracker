import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/users/leaderboard');
      setLeaderboard(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>
        <p className="text-center text-gray-600 mb-8">Top users by their habit streaks</p>

        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No users found. Be the first to start building your habits!</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {leaderboard.map((user, index) => (
              <div
                key={user._id}
                className={`bg-white p-6 rounded-lg shadow-md mb-4 flex items-center justify-between ${
                  index < 3 ? 'border-2 border-yellow-400' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-gray-600">
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">Streak Master</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{user.streaks}</p>
                  <p className="text-gray-600">streaks</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
