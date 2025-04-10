import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import BloodRequestsPage from './BloodRequestsPage';
import DonorsPage from './DonorsPage';
import BloodBanksPage from './BloodBanksPage';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'requests': return <BloodRequestsPage />;
      case 'donors': return <DonorsPage />;
      case 'banks': return <BloodBanksPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button onClick={() => setActivePage('dashboard')} className="block w-full text-left hover:bg-red-700 p-2 rounded">Dashboard</button>
        <button onClick={() => setActivePage('requests')} className="block w-full text-left hover:bg-red-700 p-2 rounded">Blood Requests</button>
        <button onClick={() => setActivePage('donors')} className="block w-full text-left hover:bg-red-700 p-2 rounded">Donors</button>
        <button onClick={() => setActivePage('banks')} className="block w-full text-left hover:bg-red-700 p-2 rounded">Blood Banks</button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
