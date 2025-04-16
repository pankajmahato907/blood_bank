
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllBloodBank = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/bloodbanks')
      .then(res => setBanks(res.data))
      .catch(err => console.error("Error fetching blood banks:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Blood Banks List</h2>
      <div className="overflow-x-auto max-w-6xl mx-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Phone</th>
              <th className="px-6 py-3 text-sm font-semibold">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {banks.map((bank, i) => (
              <tr key={bank._id || i}>
                <td className="px-6 py-4">{bank.name}</td>
                <td className="px-6 py-4">{bank.phone}</td>
                <td className="px-6 py-4">{bank.location}</td>
              </tr>
            ))}
            {banks.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No blood banks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodBank ;
