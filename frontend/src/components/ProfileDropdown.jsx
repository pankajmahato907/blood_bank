import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "./UpdatePassword"; // adjust the path if needed

const ProfileDropdown = ({ name, email, role, onClose }) => {
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    onClose();
    navigate("/");
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleDashboard = () => {
    onClose();
    if (role === "admin") {
      navigate("/adminDashboard");
    } else if (role === "donor") {
      navigate("/donorDashboard");
    } else if (role === "patient") {
      navigate("/patientDashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-16 right-4 bg-white shadow-xl rounded-xl w-72 z-40 flex flex-col overflow-hidden border border-gray-200">
        <div className="p-5 text-center bg-gray-50">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{name || "Name Not Found"}</h2>
          <p className="text-sm text-gray-500 capitalize">{role || "Role Not Set"}</p>
          <p className="text-sm text-gray-600">{email || "Email Not Set"}</p>
        </div>

        <div className="flex flex-col border-t">
          <button
            onClick={handleDashboard}
            className="px-5 py-3 text-left hover:bg-gray-100 text-gray-700 font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={handleChangePassword}
            className="px-5 py-3 text-left hover:bg-gray-100 text-gray-700 font-medium"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-3 text-left hover:bg-red-100 text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {showChangePassword && (
        <UpdatePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default ProfileDropdown;
