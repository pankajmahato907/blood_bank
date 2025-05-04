import React, { useEffect, useState } from 'react';

const AllDonors = () => {
  const [donors, setDonors] = useState([]);
  const patientBloodGroup = localStorage.getItem('bloodGroup');

  const fetchDonors = async () => {
    try {
      const res = await fetch('http://localhost:3000/donors');
      const data = await res.json();

      const filteredDonors = data.filter(
        (donor) => donor.bloodGroup === patientBloodGroup
      );

      setDonors(filteredDonors);
    } catch (err) {
      console.error('Failed to fetch donors', err);
    }
  };

  const handleSendSMS = async (phone) => {
    try {
      const res = await fetch(`http://localhost:3000/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone,
          message: 'Hello Dear, You have been matched with a patient who needs your blood. Please check yr dashboard.',
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
  
  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Matching Donors</h1>

      {donors.length === 0 ? (
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
              {donors.map((donor) => (
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
                      onClick={() => handleSendSMS(donor.phone)}
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
