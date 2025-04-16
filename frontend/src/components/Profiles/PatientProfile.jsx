import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
  const user = { 
    "fullName": "Pankaj Mahato",
    "email": "pankaj@gmail.com",
    "phone": 123455,
    "bloodGroup": "O+",
    "address": "Janakpurdham, Nepal"
  };

  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleUpdate = () => {
    console.log('Updated phone:', phone);
    console.log('Updated address:', address);
    // API call to update profile data
  };

  const handleDeleteRequest = () => {
    console.log('Delete request sent');
    // Send delete request to admin
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>

      {/* Full Name */}
      <p><strong>Full Name:</strong> {user.fullName}</p>

      {/* Email */}
      <p><strong>Email:</strong> {user.email}</p>

      {/* Phone */}
      <div className="mt-2">
        <label className="block mb-1">Phone:</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={!editMode}
        />
      </div>

      {/* Blood Group */}
      <p className="mt-2"><strong>Blood Group:</strong> {user.bloodGroup}</p>

      {/* Address */}
      <div className="mt-2">
        <label className="block mb-1">Address:</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={!editMode}
        />
      </div>

      {/* Buttons */}
      <div className="mt-4">
        {editMode ? (
          <>
            <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
              Save Changes
            </button>
            <button onClick={() => setEditMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
              Edit Profile
            </button>
            <button onClick={handleDeleteRequest} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
              Request Delete
            </button>
          </>
        )}
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;
