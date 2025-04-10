import React, { useState } from 'react';

const DonorsPage = () => {
  const [donors, setDonors] = useState([
    { id: 1, name: 'Pankaj', bloodGroup: 'O+', phone: '9800000000', address: 'Janakpur', available: 'Yes', editable: false },
  ]);

  const handleChange = (id, field, value) => {
    setDonors(prev =>
      prev.map(d => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const toggleEdit = id => {
    setDonors(prev =>
      prev.map(d => (d.id === id ? { ...d, editable: !d.editable } : d))
    );
  };

  const deleteRow = id => {
    setDonors(prev => prev.filter(d => d.id !== id));
  };

  const addRow = () => {
    setDonors(prev => [
      ...prev,
      { id: Date.now(), name: '', bloodGroup: '', phone: '', address: '', available: 'Yes', editable: true }
    ]);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Donor List</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-red-100 text-red-800">
            <th>Name</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map(d => (
            <tr key={d.id} className="border-t">
              {['name', 'bloodGroup', 'phone', 'address', 'available'].map(field => (
                <td key={field}>
                  {d.editable ? (
                    <input
                      value={d[field]}
                      onChange={e => handleChange(d.id, field, e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    d[field]
                  )}
                </td>
              ))}
              <td className="space-x-2">
                <button onClick={() => toggleEdit(d.id)} className="text-blue-600">{d.editable ? 'Save' : 'Edit'}</button>
                <button onClick={() => deleteRow(d.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Add New Donor</button>
    </div>
  );
};

export default DonorsPage;
