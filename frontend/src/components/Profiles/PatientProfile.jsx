// PatientProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
    const user = { "name":"pankaj",
        "email":"pankaj@gmail.com",
        "phone":123455,
    
     }
  const [phone, setPhone] = useState(user.phone || '');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleUpdate = () => {
    console.log('Updated phone:', phone);
    // API call to update phone number
  };

  const handleDeleteRequest = () => {
    console.log('Delete request sent');
    // Send delete request to admin
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-2">
        <label className="block mb-1">Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <button onClick={handleUpdate} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      <button onClick={handleDeleteRequest} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">Request Delete</button>
      <button onClick={handleLogout} className="ml-2 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default PatientProfile;
