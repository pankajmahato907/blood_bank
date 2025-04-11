// AdminProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth and redirect
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <p><strong>Name:</strong> Hello i am admin</p>
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default AdminProfile;
