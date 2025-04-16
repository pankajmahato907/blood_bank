import React, { useEffect, useState } from 'react';

const AllDonors = () => {
  const [donors, setDonors] = useState([]);

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
    fetchDonors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">All Donors</h1>

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
                  <span
                    className={`font-semibold ${donor.available ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {donor.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonors;
