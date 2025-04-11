import React, { useState } from 'react';
import axios from 'axios';

const SearchDonor = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [donors, setDonors] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/donors/search', {
        params: {
          bloodGroup,
          address,
        },
      });
      setDonors(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Donors</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Blood Group (e.g. A+)"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Search
        </button>
      </div>

      {donors.length > 0 ? (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Address</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 border">{donor.name}</td>
                <td className="p-2 border">{donor.phone}</td>
                <td className="p-2 border">{donor.gender}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No donors found.</p>
      )}
    </div>
  );
};

export default SearchDonor;
