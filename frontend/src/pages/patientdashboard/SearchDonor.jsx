import React, { useEffect, useState } from 'react';

const SearchDonor = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [patientBloodGroup, setPatientBloodGroup] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchPatientDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3000/patients/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setPatientBloodGroup(data.bloodGroup);
        setBloodGroup(data.bloodGroup); // prefill blood group input
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
      // initially show all matching by blood group
      if (patientBloodGroup) {
        const matching = data.filter(
          (donor) => donor.bloodGroup === patientBloodGroup
        );
        setFilteredDonors(matching);
      }
    } catch (err) {
      console.error('Failed to fetch donors', err);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  useEffect(() => {
    if (patientBloodGroup) {
      fetchDonors();
    }
  }, [patientBloodGroup]);

  const handleSearch = () => {
    const filtered = donors.filter(
      (donor) =>
        donor.bloodGroup.toLowerCase().includes(bloodGroup.toLowerCase()) &&
        donor.address.toLowerCase().includes(address.toLowerCase())
    );
    setFilteredDonors(filtered);
  };

  if (!patientBloodGroup) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Search Donors</h2>
        <p className="text-gray-600">Please register as a patient to search for matching donors.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Search Donors</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
          disabled
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
            {filteredDonors.map((donor) => (
              <tr key={donor._id} className="border-t text-center">
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
