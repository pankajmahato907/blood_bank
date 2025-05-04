import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    _id: localStorage.getItem("userId"), 
    name: '',
    phone: '',
    bloodGroup: '',
    address: '',
    note: '',
    requestForm: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, requestForm: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await fetch('http://localhost:3000/patients/register', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        localStorage.setItem('bloodGroup', formData.bloodGroup);
        navigate('/patientdashboard');
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error submitting patient registration:', error);
      alert('Error submitting the form.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Blood Request Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md"
            required
          />
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md"
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>
          <input
            type="file"
            name="requestForm"
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md"
            accept="image/*,.pdf"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md"
            required
          />
          <textarea
            name="note"
            placeholder="Leave a Note or Message"
            value={formData.note}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-md"
            rows="3"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate('/patientdashboard')}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400"
          >
            Back to Patient Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
