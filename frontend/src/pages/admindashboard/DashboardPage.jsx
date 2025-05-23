import RecentRequests from './RecentRequests'; // adjust the path if needed

const DashboardPage = ({ totals }) => {
  const stats = [
    { label: 'Total Blood Requests', value: totals.requests },
    { label: 'Total Donors Registered', value: totals.donors },
    { label: 'Total Blood Banks', value: totals.banks },
  ];

  return (
    <div>
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-4xl font-bold text-red-600">{s.value}</h3>
            <p className="text-gray-700 mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Requests component */}
      <RecentRequests />
    </div>
  );
};

export default DashboardPage;
