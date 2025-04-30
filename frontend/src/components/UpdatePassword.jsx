import React, { useState } from 'react';
import axios from 'axios';
import { Droplet } from 'lucide-react'; 

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-red-200">
        <div className="flex items-center justify-center mb-4">
          <Droplet className="text-red-600 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-center text-red-700 mb-2">
          Secure Your Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Keep your blood donor profile safe by updating your password regularly.
        </p>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-xl hover:bg-red-700 transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
