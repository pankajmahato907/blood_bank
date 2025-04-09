import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure useNavigate is imported

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    phone: '',
    bloodGroup: '',
    address: '',
    note: '',
    requestForm: null, // To store the uploaded file
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, requestForm: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you can handle the file upload and other data submission to the backend
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        {/* Title: Register as Patient */}
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Register as Patient
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-md placeholder-gray-600 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-red-500"
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

          {/* Request Form Upload */}
          <div>
            <input
              type="file"
              name="requestForm"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-md text-gray-600 focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload the request form provided by the hospital (image format).
            </p>
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-md placeholder-gray-600 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Note or Message */}
          <div>
            <textarea
              name="note"
              placeholder="Leave a Note or Message"
              value={formData.note}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-md placeholder-gray-600 focus:ring-2 focus:ring-red-500"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500"
            >
              Submit
            </button>
          </div>

          {/* Back Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/patientdashboard')} // Use navigate() here
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
            >
              Back to Patient Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
