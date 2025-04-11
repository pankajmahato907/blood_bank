import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    bloodGroup: '',
    address: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //for baackend (Donor registered)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/donors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Donor registered successfully!');
        navigate('/donordashboard'); // redirect after success
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while submitting.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Title: Register as Donor */}
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Register as Donor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded-md placeholder-gray-600 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded-md placeholder-gray-600 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="w-1/2">
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
          </div>

          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-200 rounded-md placeholder-gray-600 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500"
            >
              Submit
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/donordashboard')}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
            >
              Back to Donor Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;
