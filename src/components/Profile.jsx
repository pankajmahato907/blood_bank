import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="border border-gray-400 p-6 rounded-lg w-80">
        <div className="text-lg text-center border p-2 mb-3">{user.role} {user.id}</div>
        <button className="w-full border p-2 mb-3">Logout</button>
        <div className="w-full border p-2 mb-3">{user.id}</div>
        {user.role === "Donor" ? (
          <label className="w-full border p-2 flex justify-between">
            Available
            <input type="checkbox" className="accent-purple-500" />
          </label>
        ) : (
          <button className="w-full border p-2">Delete Request</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
