import React from 'react';

const Profile = () => {
  const name = localStorage.getItem('Name');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full text-3xl font-bold">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{name || "Name Not Found"}</h1>
        <p className="text-sm text-gray-500 mb-4 capitalize">{role || "Role Not Set"}</p>
        <p className="text-sm text-gray-600">{email || "Email Not Set"}</p>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload(); 
          }}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
