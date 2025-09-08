import React, { useState } from 'react';
import api from '../services/api';

const AddFriend = ({ onFriendAdded }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const searchUsers = async () => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/users/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(res.data);
      setSearchPerformed(true);
    } catch (err) {
      console.error('Error searching users:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (userId) => {
    try {
      await api.post(`/users/${userId}/follow`);
      
      // Update the search results to reflect the new following status
      setSearchResults(prev => 
        prev.map(user => 
          user._id === userId 
            ? { ...user, isFollowing: true }
            : user
        )
      );
      
      // Show success message
      setSuccessMessage('Friend added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Notify parent component
      if (onFriendAdded) {
        onFriendAdded();
      }
    } catch (err) {
      console.error('Error following user:', err);
      alert(err.response?.data?.msg || 'Error following user');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchUsers();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Friends</h2>
      
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}
      
      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          minLength={2}
        />
        <button
          onClick={searchUsers}
          disabled={loading || searchQuery.length < 2}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Search Results */}
      {searchPerformed && (
        <div>
          {searchResults.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              {loading ? 'Searching...' : 'No users found'}
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-2">
                Found {searchResults.length} user{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => followUser(user._id)}
                    disabled={user.isFollowing}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      user.isFollowing
                        ? 'bg-green-100 text-green-800 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {user.isFollowing ? '✓ Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!searchPerformed && (
        <div className="text-center py-6 text-gray-500">
          <p className="mb-2">🔍 Search for friends by name or email</p>
          <p className="text-sm">Enter at least 2 characters to start searching</p>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
