import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet } from 'lucide-react';

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("email");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/patients/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setPatient(data);
        } else {
          alert(data.message || "Failed to load patient details.");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching patient details.");
      }
    };

    fetchPatientDetails();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/patients/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isPatientRegistered", "false");
        navigate('/patientdashboard');
      } else {
        alert(data.message || 'Delete failed.');
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting request.");
    }
  };

  if (!patient) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <Droplet className="text-red-600 w-10 h-10 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-red-700 mb-1">Patient Details</h2>
        <p className="text-gray-500 mb-4">Personal blood patient details</p>

        <div className="text-left space-y-2 text-gray-700 mb-6">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {userEmail || "N/A"}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Note:</strong> {patient.note || "None"}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-red-700 text-white py-2 rounded-md font-semibold hover:bg-red-800"
        >
          Delete Patient Registration
        </button>

        <button
          onClick={() => navigate('/patientdashboard')}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400 mt-2"
        >
          Back to Dashboard
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Confirm Deletion</h3>
            <p className="mb-4 text-sm text-gray-700">Are you sure you want to delete your patient registration?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
