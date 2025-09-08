import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AddFriend from '../components/AddFriend';
import api from '../services/api';

const AddFriendsPage = () => {
  const [currentFriends, setCurrentFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentFriends();
  }, []);

  const fetchCurrentFriends = async () => {
    try {
      // We'll need to get the current user's friends
      const res = await api.get('/auth/me');
      const user = res.data;
      
      if (user.friends && user.friends.length > 0) {
        // Fetch friend details
        const friendPromises = user.friends.map(friendId => 
          api.get(`/users/${friendId}`)
        );
        const friendResponses = await Promise.allSettled(friendPromises);
        
        const friends = friendResponses
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value.data);
          
        setCurrentFriends(friends);
      }
    } catch (err) {
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFriendAdded = () => {
    // Refresh the friends list when a new friend is added
    fetchCurrentFriends();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Manage Friends
          </h1>
          <p className="text-center text-gray-600">
            Search for friends and see who you're already following
          </p>
        </div>

        {/* Add Friend Component */}
        <AddFriend onFriendAdded={handleFriendAdded} />

        {/* Current Friends List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Friends ({currentFriends.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : currentFriends.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">👥 You haven't added any friends yet</p>
              <p className="text-sm">Search for friends above to get started!</p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {currentFriends.map((friend) => (
                <div
                  key={friend._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{friend.name}</p>
                    <p className="text-sm text-gray-600">{friend.email}</p>
                    {friend.streaks !== undefined && (
                      <p className="text-xs text-blue-600 font-medium">
                        🔥 {friend.streaks} day streak
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium">
                      ✓ Following
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Search for friends by their name or email address</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Once you follow someone, you'll see their habit completions in your Friends Feed</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Friends can motivate you and help you stay accountable to your habits</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Check the leaderboard to see how you compare with your friends</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddFriendsPage;
