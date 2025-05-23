import React, { useState, useEffect } from 'react';

const RecentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/blood-requests/latest')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch recent requests');
        return res.json();
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading recent requests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Blood Requests</h2>
      <table className="w-full text-sm border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Blood Group</th>
            <th className="border border-gray-300 p-2 text-left">Address</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{r.name}</td>
              <td className="border border-gray-300 p-2">{r.bloodGroup}</td>
              <td className="border border-gray-300 p-2">{r.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentRequests;
