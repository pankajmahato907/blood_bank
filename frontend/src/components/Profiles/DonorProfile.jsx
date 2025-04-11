// DonorProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonorProfile = () => {
  const [phone, setPhone] = useState();
  const [available, setAvailable] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleUpdate = () => {
    // Update donor info to backend
    console.log('Updated phone:', phone, 'Available:', available);
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Donor Profile</h2>
      {/* <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-2">
        <label className="block mb-1">Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-2 rounded" />
      </div> */}

      <div className="mt-2">
        <label className="block mb-1">Availability:</label>
        <select value={available} onChange={(e) => setAvailable(e.target.value)} className="w-full border p-2 rounded">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <button onClick={handleUpdate} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      <button onClick={handleLogout} className="ml-2 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default DonorProfile;
