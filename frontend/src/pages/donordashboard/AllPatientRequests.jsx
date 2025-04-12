import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllPatientRequests() {
  const [patientRequests, setPatientRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/patients/requests')
      .then(res => {
        console.log('Patient Data:', res.data);  // Log the data to check the response
        setPatientRequests(res.data);
      })
      .catch(err => console.error('Error fetching patient data:', err));
  }, []);

  return (
    <div className="mt-8 max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Patient Blood Requests</h2>
      {patientRequests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patientRequests.map((p, i) => (
            <div key={i} className="border p-4 rounded shadow-sm">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Phone:</strong> {p.phone}</p>
              <p><strong>Blood Group:</strong> {p.bloodGroup}</p>
              <p><strong>Address:</strong> {p.address}</p>
              <p><strong>Note:</strong> {p.note}</p>
              {p.requestForm && (
                <a
                  href={`http://localhost:3000/${p.requestForm}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Request Form
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPatientRequests;
