import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HabitCard = ({ habit, onUpdate, onEdit }) => {
  const [progress, setProgress] = useState({ streak: 0, completions: [] });
  
  const getCategoryIcon = (category) => {
    const icons = {
      'Health': '🏥',
      'Fitness': '💪',
      'Study': '📚',
      'Work': '💼',
      'Personal': '🧑',
      'Financial': '💰',
      'Hobbies': '🎯'
    };
    return icons[category] || '📝';
  };

  useEffect(() => {
    fetchProgress();
  }, [habit._id]);

  const fetchProgress = async () => {
    try {
      const res = await api.get(`/habits/${habit._id}/progress`);
      setProgress(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const completeHabit = async () => {
    try {
      await api.post(`/habits/${habit._id}/complete`);
      alert('Habit completed successfully!');
      onUpdate();
      fetchProgress();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'An error occurred while completing the habit.');
    }
  };

  const deleteHabit = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await api.delete(`/habits/${habit._id}`);
        onUpdate();
      } catch (err) {
        console.error(err);
        alert('Error deleting habit');
      }
    }
  };

  const completionRate = progress.completions.length > 0
    ? Math.round((progress.completions.filter(c => {
        const completionDate = new Date(c.date);
        const today = new Date();
        return completionDate.toDateString() === today.toDateString();
      }).length / 1) * 100)
    : 0;

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-5">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{habit.name}</h3>
          <p className="text-gray-600 text-sm">{getCategoryIcon(habit.category)} {habit.category} | {habit.frequency}</p>
          {habit.tags && habit.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {habit.tags.map((tag, index) => (
                <span key={index} className="badge badge-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(habit)}
            className="btn btn-warning text-sm px-3 py-1"
          >
            Edit
          </button>
          <button
            onClick={deleteHabit}
            className="btn btn-danger text-sm px-3 py-1"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600 mb-1">{progress.streak}</p>
          <p className="text-gray-600 text-sm font-medium">🔥 Streak</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600 mb-1">{completionRate}%</p>
          <p className="text-gray-600 text-sm font-medium">🎯 Today</p>
        </div>
      </div>

      <button
        onClick={completeHabit}
        className="btn btn-primary w-full py-3"
      >
        Check In
      </button>
    </div>
  );
};

export default HabitCard;
