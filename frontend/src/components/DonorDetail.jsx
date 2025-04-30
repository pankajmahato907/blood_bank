import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Droplet } from 'lucide-react';

const DonorDetail = () => {
  const email = localStorage.getItem('email');
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/donors/${email}`);
        setDonor(res.data);
      } catch (err) {
        setError('Failed to load donor profile.');
      }
    };

    if (email) {
      fetchDonor();
    } else {
      setError('No email found in local storage.');
    }
  }, [email]);

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  if (!donor) {
    return <p className="text-center mt-10 text-gray-500">Loading donor profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <Droplet className="text-red-600 w-10 h-10 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-red-700 mb-1">Donor Profile</h2>
        <p className="text-gray-500 mb-4">Personal blood donor details</p>

        <div className="text-left space-y-2">
          <p><strong>Name:</strong> {donor.name}</p>
          <p><strong>Email:</strong> {donor.email}</p>
          <p><strong>Phone:</strong> {donor.phone}</p>
          <p><strong>Gender:</strong> {donor.gender}</p>
          <p><strong>Blood Group:</strong> <span className="text-red-700 font-semibold">{donor.bloodGroup}</span></p>
          <p><strong>Address:</strong> {donor.address}</p>
        </div>
      </div>
    </div>
  );
};

export default DonorDetail;
