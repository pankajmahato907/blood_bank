import React, { useState } from 'react';

const AllBloodBank = ({ bankDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(bankDetails);

  const handleSearch = () => {
    const filtered = bankDetails.filter((bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanks(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Blood Banks List</h2>

      {/* Search bar full width to match the list */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 w-full sm:w-auto bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Search
        </button>
      </div>

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
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bank, i) => (
                <tr key={bank._id || i}>
                  <td className="px-6 py-4">{bank.name}</td>
                  <td className="px-6 py-4">{bank.phone}</td>
                  <td className="px-6 py-4">{bank.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No blood banks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodBank;
