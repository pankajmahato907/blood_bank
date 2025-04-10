import React, { useState } from 'react';

const BloodBanksPage = () => {
  const [banks, setBanks] = useState([
    { id: 1, name: 'Red Cross', location: 'Kathmandu', phone: '014441234', editable: false },
  ]);

  const handleChange = (id, field, value) => {
    setBanks(prev =>
      prev.map(b => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const toggleEdit = id => {
    setBanks(prev =>
      prev.map(b => (b.id === id ? { ...b, editable: !b.editable } : b))
    );
  };

  const deleteRow = id => {
    setBanks(prev => prev.filter(b => b.id !== id));
  };

  const addRow = () => {
    setBanks(prev => [
      ...prev,
      { id: Date.now(), name: '', location: '', phone: '', editable: true }
    ]);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Blood Banks</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-red-100 text-red-800">
            <th>Bank Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banks.map(b => (
            <tr key={b.id} className="border-t">
              {['name', 'location', 'phone'].map(field => (
                <td key={field}>
                  {b.editable ? (
                    <input
                      value={b[field]}
                      onChange={e => handleChange(b.id, field, e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    b[field]
                  )}
                </td>
              ))}
              <td className="space-x-2">
                <button onClick={() => toggleEdit(b.id)} className="text-blue-600">{b.editable ? 'Save' : 'Edit'}</button>
                <button onClick={() => deleteRow(b.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Add New Bank</button>
    </div>
  );
};

export default BloodBanksPage;
