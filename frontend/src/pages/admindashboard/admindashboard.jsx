import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <aside className="w-1/4 space-y-4">
          <button className="w-full py-2 bg-indigo-600 text-white rounded">Donor</button>
          <button className="w-full py-2 bg-indigo-600 text-white rounded">Requested</button>
          <button className="w-full py-2 bg-indigo-600 text-white rounded">Blood Bank</button>
        </aside>
        <main className="flex-1">
          <table className="w-full border text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Blood Group</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Available</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Pankaj</td>
                <td className="border p-2">A+</td>
                <td className="border p-2">1234567890</td>
                <td className="border p-2">Some Address</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2 space-x-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;