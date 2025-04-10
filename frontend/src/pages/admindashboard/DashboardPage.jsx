import React from 'react';

const DashboardPage = () => {
  const stats = [
    { label: 'Total Blood Requests', value: 23 },
    { label: 'Total Donors Registered', value: 45 },
    { label: 'Total Blood Banks', value: 12 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-4xl font-bold text-red-600">{s.value}</h3>
          <p className="text-gray-700 mt-2">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
