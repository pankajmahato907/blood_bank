import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const UpdatePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/update-password', {
        email,
        currentPassword,
        newPassword,
      });
      setMessage(res.data.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating password');
    }
  };

  return (
    <div className="absolute top-20 right-10 bg-white border border-gray-200 shadow-xl rounded-xl z-50 p-4 w-64">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
        <h3 className="text-center font-semibold text-gray-700">Change Password</h3>

        {/* Current Password */}
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            placeholder="Current"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-2 py-1 pr-8 rounded-md text-sm"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="New"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-2 py-1 pr-8 rounded-md text-sm"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {message && <p className="text-green-500 text-xs text-center">{message}</p>}
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <div className="flex justify-between items-center pt-1">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-gray-500 hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
