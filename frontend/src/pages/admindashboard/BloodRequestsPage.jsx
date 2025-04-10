import React, { useState } from 'react';

const BloodRequestsPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John', bloodGroup: 'A+', phone: '9812345678', address: 'Kathmandu', editable: false },
  ]);

  const handleChange = (id, field, value) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const toggleEdit = id => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, editable: !r.editable } : r))
    );
  };

  const deleteRow = id => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const addRow = () => {
    setRequests(prev => [...prev, { id: Date.now(), name: '', bloodGroup: '', phone: '', address: '', editable: true }]);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Blood Requests</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-red-100 text-red-800">
            <th>Name</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id} className="border-t">
              {['name', 'bloodGroup', 'phone', 'address'].map(field => (
                <td key={field}>
                  {r.editable ? (
                    <input
                      value={r[field]}
                      onChange={e => handleChange(r.id, field, e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    r[field]
                  )}
                </td>
              ))}
              <td className="space-x-2">
                <button onClick={() => toggleEdit(r.id)} className="text-blue-600">{r.editable ? 'Save' : 'Edit'}</button>
                <button onClick={() => deleteRow(r.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Add New Request</button>
    </div>
  );
};

export default BloodRequestsPage;
