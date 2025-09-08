import React, { useEffect, useState } from 'react';
import api from '../services/api';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchHabits();
  }, [categoryFilter]);

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHabits = async () => {
    try {
      const params = categoryFilter ? { category: categoryFilter } : {};
      const res = await api.get('/habits', { params });
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOrUpdate = () => {
    setIsFormVisible(false);
    setEditingHabit(null);
    fetchHabits();
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setIsFormVisible(true);
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => {
    // This is a simple check; in a real app, you'd fetch completion data
    return Math.random() > 0.5; // Placeholder
  }).length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Simple Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name || 'User'}!
            </h1>
            <p className="text-gray-600">Track your habits and build consistency</p>
          </div>
          
          {/* Simple Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{user.streaks || 0}</div>
              <p className="text-gray-600 text-sm">Day Streak 🔥</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{totalHabits}</div>
              <p className="text-gray-600 text-sm">Total Habits 🎯</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{completionRate}%</div>
              <p className="text-gray-600 text-sm">Completion Rate 📊</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 pb-16">
        
        {/* Habits Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Habits</h2>
            <p className="text-gray-600">Manage your daily routines</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-select border border-gray-300 rounded-lg px-4 py-2 min-w-[180px]"
            >
              <option value="">All Categories</option>
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Financial">Financial</option>
              <option value="Hobbies">Hobbies</option>
            </select>

            <button
              onClick={() => setIsFormVisible(true)}
              className="btn btn-primary px-6 py-2 whitespace-nowrap"
            >
              Add New Habit
            </button>
          </div>
        </div>

        {/* Habit Form Modal */}
        {isFormVisible && (
          <div className="modal-modern">
            <HabitForm
              onComplete={handleCreateOrUpdate}
              habitToEdit={editingHabit}
            />
          </div>
        )}

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No habits yet!</h3>
            <p className="text-gray-600 mb-6">Start building your first habit to track your progress.</p>
            <button
              onClick={() => setIsFormVisible(true)}
              className="btn btn-primary"
            >
              Create Your First Habit
            </button>
          </div>
        ) : (
          <div>
            {/* Habits Counter */}
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                {habits.length} {habits.length === 1 ? 'habit' : 'habits'}
                {categoryFilter && <span className="ml-1">in {categoryFilter}</span>}
              </p>
            </div>
            
            {/* Habits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onUpdate={fetchHabits}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}       

export default Dashboard;
