import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [available, setAvailable] = useState(true);
  const navigate = useNavigate();

  const donorId = localStorage.getItem('donorId'); 

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await fetch(`http://localhost:3000/donors/${donorId}`);
        const data = await res.json();
        setDonor(data);
        setAvailable(data.available); 
      } catch (err) {
        console.error('Error fetching donor profile:', err);
      }
    };

    if (donorId) fetchDonor();
  }, [donorId]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/donors/${donorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available }),
      });

      const data = await res.json();
      alert(data.message || 'Availability updated');
    } catch (err) {
      console.error('Error updating availability:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Donor Profile</h2>

      {donor && (
        <>
          <p><strong>Name:</strong> {donor.name}</p>
          <p><strong>Phone:</strong> {donor.phone}</p>
          <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
        </>
      )}

      <div className="mt-4">
        <label className="block mb-1">Availability:</label>
        <select
          value={available ? "Yes" : "No"}
          onChange={(e) => setAvailable(e.target.value === "Yes")}
          className="w-full border p-2 rounded"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <button onClick={handleUpdate} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
      <button onClick={handleLogout} className="ml-2 bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default DonorProfile;
