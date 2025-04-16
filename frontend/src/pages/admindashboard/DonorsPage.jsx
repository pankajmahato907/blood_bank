import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorsPage = () => {
  const [donors, setDonors] = useState([
    {
      _id: '1',
      name: 'Pankaj',
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '9800000000',
      address: 'Janakpur',
      available: 'Yes',
      editable: false,
    },
  ]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/donors");
        const formatted = resp.data.map(d => ({
          ...d,
          available: d.available ? 'Yes' : 'No',
          editable: false,
        }));
        setDonors(formatted);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };
  
    fetchDonors();
  }, []);

  const handleChange = (_id, field, value) => {
    setDonors(prev =>
      prev.map(d => (d._id === _id ? { ...d, [field]: value } : d))
    );
  };

  const toggleEdit = async (_id) => {
    const donorToEdit = donors.find(d => d._id === _id);
  
    if (donorToEdit.editable) {
      try {
        const updatedDonor = {
          ...donorToEdit,
          available: donorToEdit.available === 'Yes',
        };
  
        await axios.put(`http://localhost:3000/donors/${_id}`, updatedDonor);
  
        setDonors(prev =>
          prev.map(d =>
            d._id === _id ? { ...d, editable: false } : d
          )
        );
      } catch (err) {
        console.error('Error updating donor:', err);
      }
    } else {
     
      setDonors(prev =>
        prev.map(d =>
          d._id === _id ? { ...d, editable: true } : d
        )
      );
    }
  };
  

  const deleteRow = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/donors/delete/${_id}`);
      setDonors(prev => prev.filter(d => d._id !== _id));
    } catch (err) {
      console.error('Error deleting donor:', err);
    }
  };
  

  const addRow = () => {
    setDonors(prev => [
      ...prev,
      {
        _id: Date.now().toString(), // Temporary frontend ID
        name: '',
        gender: '',
        bloodGroup: '',
        phone: '',
        address: '',
        available: 'Yes',
        editable: true,
      },
    ]);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Donor List</h2>
      <table className="w-full text-left border">
       
        <thead>
          <tr className="bg-red-100 text-red-800">
            <th>Name</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map(d => (
            <tr key={d._id} className="border-t">
              {d.editable ? (
                <>
                  <td>
                    <input
                      value={d.name}
                      onChange={e => handleChange(d._id, 'name', e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td>
                    <select
                      value={d.gender}
                      onChange={e => handleChange(d._id, 'gender', e.target.value)}
                      className="border p-1 w-full"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={d.bloodGroup}
                      onChange={e => handleChange(d._id, 'bloodGroup', e.target.value)}
                      className="border p-1 w-full"
                    >
                      <option value="">Select</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </td>
                  <td>
                    <input
                      value={d.phone}
                      onChange={e => handleChange(d._id, 'phone', e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td>
                    <input
                      value={d.address}
                      onChange={e => handleChange(d._id, 'address', e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td>
                    <select
                      value={d.available}
                      onChange={e => handleChange(d._id, 'available', e.target.value)}
                      className="border p-1 w-full"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                </>
              ) : (
                <>
                  <td>{d.name}</td>
                  <td>{d.gender}</td>
                  <td>{d.bloodGroup}</td>
                  <td>{d.phone}</td>
                  <td>{d.address}</td>
                  <td>{d.available}</td>
                </>
              )}
              <td className="space-x-2">
                <button
                  onClick={() => toggleEdit(d._id)}
                  className="text-blue-600"
                >
                  {d.editable ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteRow(d._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default DonorsPage;
