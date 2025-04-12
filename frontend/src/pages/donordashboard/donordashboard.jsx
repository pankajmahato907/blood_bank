import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blooddonate from '../../assets/blooddonate.png';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [showCriteria, setShowCriteria] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2">
      {/* Hero Image */}
      <div className="w-full mb-6">
        <img
          src={blooddonate}
          alt="Donate blood, save lives"
          className="w-full h-52 sm:h-64 md:h-[300px] object-cover shadow-lg rounded-md"
        />
      </div>

      {/* Dashboard Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-2">
        <button
          onClick={() => setShowCriteria(true)}
          className="bg-green-500 text-white py-8 rounded-lg shadow-md text-center text-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          Donor Registration
        </button>
        <button
          onClick={() => navigate('/patientrequest')}
          className="bg-blue-500 text-white py-8 rounded-lg shadow-md text-center text-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          Request Receive
        </button>
        <button className="bg-purple-500 text-white py-8 rounded-lg shadow-md text-center text-lg font-semibold">
          Contribute
        </button>
        <button
          onClick={() => navigate('/criteria')}
          className="bg-orange-500 text-white py-8 rounded-lg shadow-md text-center text-lg font-semibold hover:scale-105 transition-transform duration-300"
        >
          Donor Facts
        </button>
      </div>

      {/* Eligibility Criteria Modal */}
      {showCriteria && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold text-red-700 border-b pb-2">Blood Donation Eligibility</h2>

            <h3 className="font-semibold mt-3">✅ You Can Donate If:</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
              <li>Age: <strong>18-65 years</strong></li>
              <li>Weight: <strong>50kg (110 lbs) or more</strong></li>
              <li>Good health, no recent illnesses</li>
              <li>No recent surgeries or tattoos (wait 3-6 months)</li>
            </ul>

            <h3 className="font-semibold mt-3">🚫 You Cannot Donate If:</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
              <li>Have HIV, Hepatitis B/C, or blood disorders</li>
              <li>Currently pregnant or breastfeeding</li>
              <li>On certain medications (consult a doctor)</li>
            </ul>

            {/* Checkbox */}
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="agree" className="ml-2 text-gray-800 text-sm">
                I confirm that I meet the eligibility criteria.
              </label>
            </div>

            {/* Modal Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowCriteria(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                disabled={!isChecked}
                onClick={() => navigate('/registerdonor')}
                className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                  isChecked ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
