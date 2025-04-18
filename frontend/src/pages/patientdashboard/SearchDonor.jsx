import React, { useEffect, useState } from 'react';

const SearchDonor = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

  useEffect(() => {
    // Fetch all donors once on mount
    const fetchDonors = async () => {
      try {
        const res = await fetch('http://localhost:3000/donors');
        const data = await res.json();
        setDonors(data);
        setFilteredDonors(data); // Show all by default
      } catch (err) {
        console.error('Failed to fetch donors:', err);
      }
    };
    fetchDonors();
  }, []);

  const handleSearch = () => {
    const filtered = donors.filter((donor) =>
      donor.bloodGroup.toLowerCase().includes(bloodGroup.toLowerCase()) &&
      donor.address.toLowerCase().includes(address.toLowerCase())
    );
    setFilteredDonors(filtered);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Search Donors</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Blood Group (e.g. A+)"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Search
        </button>
      </div>

      {filteredDonors.length > 0 ? (
        <table className="w-full text-left border shadow-lg bg-white rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Availability</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor, index) => (
              <tr key={index} className="border-t text-center">
                <td className="p-2 border">{donor.name}</td>
                <td className="p-2 border">{donor.phone}</td>
                <td className="p-2 border">{donor.gender}</td>
                <td className="p-2 border">{donor.bloodGroup}</td>
                <td className="p-2 border">{donor.address}</td>
                <td className="p-2 border">
                  <span className={`font-semibold ${donor.available ? 'text-green-600' : 'text-gray-500'}`}>
                    {donor.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No donors found.</p>
      )}
    </div>
  );
};

export default SearchDonor;
