import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const FriendsFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      // Get current user first to get their ID
      const userRes = await api.get('/auth/me');
      const userId = userRes.data._id;
      
      // Then fetch their friends' feed
      const res = await api.get(`/users/${userId}/feed`);
      setFeed(res.data);
    } catch (err) {
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold mb-6 text-center">Friends' Activity Feed</h1>

        {feed.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No recent activity from your friends.</p>
            <p>Follow some friends to see their habit completions here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feed.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{item.userId.name}</p>
                    <p className="text-gray-600">
                      Completed: <span className="font-medium">{item.habitId.name}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ✅ Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsFeed;
