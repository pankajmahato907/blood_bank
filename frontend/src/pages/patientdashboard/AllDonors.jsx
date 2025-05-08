import React, { useEffect, useState } from 'react';

const AllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [patientBloodGroup, setPatientBloodGroup] = useState(null);
  const userId = localStorage.getItem("userId");

  // Fetch patient blood group dynamically from backend
  const fetchPatientDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3000/patients/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setPatientBloodGroup(data.bloodGroup);
      } else {
        setPatientBloodGroup(null);
      }
    } catch (err) {
      console.error('Error fetching patient details:', err);
      setPatientBloodGroup(null);
    }
  };

  const fetchDonors = async () => {
    try {
      const res = await fetch('http://localhost:3000/donors');
      const data = await res.json();
      setDonors(data);
    } catch (err) {
      console.error('Failed to fetch donors', err);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchDonors();
  }, []);

  const handleSendSMS = async (phone, name, blood) => {
    try {
      const res = await fetch(`http://localhost:3000/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone,
          message: `Hello ${name}, A user has requested for your blood group ${blood}. Please visit our office if you're available. Thank you!`,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert('SMS sent successfully!');
      } else {
        alert(`Failed to send SMS: ${result.message}`);
      }
    } catch (err) {
      console.error('Error sending SMS:', err);
      alert('Failed to send SMS');
    }
  };

  // Filter donors after patientBloodGroup is available
  const matchingDonors = patientBloodGroup
    ? donors.filter((donor) => donor.bloodGroup === patientBloodGroup)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Matching Donors</h1>

      {patientBloodGroup === null ? (
        <p className="text-center text-gray-500">Please register as a patient to view matching donors.</p>
      ) : matchingDonors.length === 0 ? (
        <p className="text-center text-gray-500">No matching donors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Gender</th>
                <th className="py-3 px-6">Blood Group</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Availability</th>
                <th className="py-3 px-6">Send SMS</th>
              </tr>
            </thead>
            <tbody>
              {matchingDonors.map((donor) => (
                <tr key={donor._id} className="text-center border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{donor.name}</td>
                  <td className="py-2 px-4">{donor.phone}</td>
                  <td className="py-2 px-4">{donor.gender}</td>
                  <td className="py-2 px-4">{donor.bloodGroup}</td>
                  <td className="py-2 px-4">{donor.address}</td>
                  <td className="py-2 px-4">
                    <span className={`font-semibold ${donor.available ? 'text-green-600' : 'text-gray-500'}`}>
                      {donor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleSendSMS(donor.phone, donor.name, donor.bloodGroup)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Send SMS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllDonors;
