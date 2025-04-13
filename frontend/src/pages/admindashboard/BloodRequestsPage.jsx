import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patient requests
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3000/patients/requests');
      const withEditableFlag = res.data.map(r => ({ ...r, editable: false }));
      setRequests(withEditableFlag);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setRequests(prev =>
      prev.map(r => r._id === id ? { ...r, [field]: value } : r)
    );
  };

  const toggleEdit = (id) => {
    setRequests(prev =>
      prev.map(r => r._id === id ? { ...r, editable: !r.editable } : r)
    );
  };

  const saveEdit = async (request) => {
    try {
      await axios.put(`http://localhost:3000/patients/${request._id}`, request);
      toggleEdit(request._id);
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/patients/${id}`);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  const addRow = () => {
    const newRequest = {
      _id: Date.now().toString(),
      name: '',
      bloodGroup: '',
      phone: '',
      address: '',
      note: '',
      requestForm: '',
      confirmed: false,
      editable: true,
      isNew: true
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const saveNewRequest = async (request) => {
    try {
      const { _id, editable, isNew, ...toSend } = request;
      const res = await axios.post('http://localhost:3000/patients', toSend);
      fetchRequests();
    } catch (err) {
      console.error("Error saving new request:", err);
    }
  };

  const confirmRequest = async (id) => {
    try {
      await axios.put(`http://localhost:3000/patients/${id}`, { confirmed: true });
      setRequests(prev =>
        prev.map(r => r._id === id ? { ...r, confirmed: true } : r)
      );
    } catch (err) {
      console.error("Error confirming request:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-700">Patient Blood Requests</h2>
        <button
          onClick={addRow}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add New Request
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-red-100 text-red-800">
              <th>Name</th>
              <th>Blood Group</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Note</th>
              <th>Form</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-t">
                {['name', 'bloodGroup', 'phone', 'address', 'note'].map(field => (
                  <td key={field}>
                    {r.editable ? (
                      <input
                        value={r[field]}
                        onChange={e => handleChange(r._id, field, e.target.value)}
                        className="border p-1 w-full"
                      />
                    ) : (
                      r[field]
                    )}
                  </td>
                ))}
                <td>
                  {r.requestForm ? (
                    <a
                      href={`http://localhost:3000/${r.requestForm}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Form
                    </a>
                  ) : 'N/A'}
                </td>
                <td>
                  {r.confirmed ? (
                    <span className="text-green-600 font-semibold">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => confirmRequest(r._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Confirm
                    </button>
                  )}
                </td>
                <td className="space-x-2">
                  {r.editable ? (
                    r.isNew ? (
                      <button
                        onClick={() => saveNewRequest(r)}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => saveEdit(r)}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => toggleEdit(r._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteRequest(r._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BloodRequestsPage;
