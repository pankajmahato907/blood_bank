import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonorDetail = () => {
  const email = localStorage.getItem('email');
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const handleAvailabilityToggle = async () => {
    try {
      const updatedAvailability = !donor.available;
      const response = await axios.put(`http://localhost:3000/donors/${donor._id}`, { available: updatedAvailability });
      setDonor({ ...donor, available: updatedAvailability });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const handleDeleteDonor = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/donors/delete/${donor._id}`);
      setShowModal(false);
      navigate('/donordashboard');
    } catch (error) {
      console.error('Error deleting donor:', error);
      alert('Failed to delete donor');
    }
  };

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  if (!donor) {
    return <p className="text-center mt-10 text-gray-500">Loading donor Details...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <Droplet className="text-red-600 w-10 h-10 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-red-700 mb-1">Donor Details</h2>
        <p className="text-gray-500 mb-4">Personal blood donor details</p>

        <div className="text-left space-y-2">
          <p><strong>Name:</strong> {donor.name}</p>
          <p><strong>Email:</strong> {donor.email}</p>
          <p><strong>Phone:</strong> {donor.phone}</p>
          <p><strong>Gender:</strong> {donor.gender}</p>
          <p><strong>Blood Group:</strong> <span className="text-red-700 font-semibold">{donor.bloodGroup}</span></p>
          <p><strong>Address:</strong> {donor.address}</p>

          <div>
            <p><strong>Availability:</strong> {donor.available ? 'Available' : 'Not Available'}</p>
            <button 
              onClick={handleAvailabilityToggle} 
              className={`mt-2 p-2 rounded-lg ${donor.available ? 'bg-red-600 text-white' : 'bg-gray-500 text-white'}`}>
              {donor.available ? 'Mark as Not Available' : 'Mark as Available'}
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 p-2 rounded-lg bg-red-700 text-white"
          >
            Delete Donor Registration
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Confirm Deletion</h3>
            <p className="mb-4 text-sm text-gray-700">Are you sure you want to delete your donor registration?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDonor}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer for Availability Updates */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="w-64 text-sm"
      />
    </div>
  );
};

export default DonorDetail;
