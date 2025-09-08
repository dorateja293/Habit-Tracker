import React, { useState } from 'react';
import api from '../services/api';

const HabitForm = ({ onComplete, habitToEdit }) => {
  const [formData, setFormData] = useState(
    habitToEdit ? {
      ...habitToEdit,
      tags: habitToEdit.tags ? habitToEdit.tags.join(', ') : ''
    } : { name: '', category: 'Health', frequency: 'daily', tags: '' }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Habit name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.frequency) {
      newErrors.frequency = 'Frequency is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const dataToSend = { ...formData, tags: tagsArray };

      if (habitToEdit) {
        await api.put(`/habits/${habitToEdit._id}`, dataToSend);
      } else {
        await api.post('/habits', dataToSend);
      }
      onComplete();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.msg) {
        alert(err.response.data.msg);
      } else {
        alert('An error occurred while saving the habit');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
          {habitToEdit ? 'Edit Habit ✏️' : 'Create New Habit ✨'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Habit Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter habit name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${
                errors.category ? 'border-red-500' : ''
              }`}
            >
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Financial">Financial</option>
              <option value="Hobbies">Hobbies</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Frequency *</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className={`form-select ${
                errors.frequency ? 'border-red-500' : ''
              }`}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="morning, exercise, etc."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onComplete}
              className="btn bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {habitToEdit ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
