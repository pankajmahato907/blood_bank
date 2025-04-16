import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodBanksPage = () => {
  const [banks, setBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/bloodbanks')
      .then(res => {
        const data = res.data.map(b => ({ ...b, editable: false }));
        setBanks(data);
      })
      .catch(err => console.error('Error fetching banks:', err));
  }, []);

  const handleChange = (id, field, value) => {
    setBanks(prev =>
      prev.map(b => (b._id === id ? { ...b, [field]: value } : b))
    );
  };

  const toggleEdit = async id => {
    const bank = banks.find(b => b._id === id);
    if (bank.editable) {
      try {
        const updated = await axios.put(`http://localhost:3000/bloodbanks/${id}`, {
          name: bank.name,
          location: bank.location,
          phone: bank.phone
        });
        setBanks(prev =>
          prev.map(b => (b._id === id ? { ...updated.data, editable: false } : b))
        );
      } catch (err) {
        console.error('Error saving:', err);
      }
    } else {
      setBanks(prev =>
        prev.map(b => (b._id === id ? { ...b, editable: true } : b))
      );
    }
  };

  const deleteRow = async id => {
    try {
      await axios.delete(`http://localhost:3000/bloodbanks/${id}`);
      setBanks(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const addRow = async () => {
    try {
      const res = await axios.post('http://localhost:3000/bloodbanks', {
        name: '',
        location: '',
        phone: ''
      });
      setBanks(prev => [...prev, { ...res.data, editable: true }]);
    } catch (err) {
      console.error('Error adding:', err);
    }
  };

  // Filter based on search term
  const filteredBanks = banks.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.phone.includes(searchTerm)
  );

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Blood Banks</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name, location, phone..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full"
      />

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
          {filteredBanks.map(b => (
            <tr key={b._id} className="border-t">
              {['name', 'location', 'phone'].map(field => (
                <td key={field}>
                  {b.editable ? (
                    <input
                      value={b[field]}
                      onChange={e => handleChange(b._id, field, e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    b[field]
                  )}
                </td>
              ))}
              <td className="space-x-2">
                <button onClick={() => toggleEdit(b._id)} className="text-blue-600">
                  {b.editable ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => deleteRow(b._id)} className="text-red-600">Delete</button>
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
