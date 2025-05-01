import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, UserCircle } from "lucide-react";
import { useAuth } from "./AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { loggedIN } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const name = localStorage.getItem("Name");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Digital Blood Bank
            </span>
          </Link>
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            <Link to="/" className="text-gray-700 hover:text-red-600 px-3 py-2">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 px-3 py-2">
              About Us
            </Link>
            <Link to="/criteria" className="text-gray-700 hover:text-red-600 px-3 py-2">
              Facts & Criteria
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600 px-3 py-2">
              Contact
            </Link>

            {loggedIN ? (
              <>
                <UserCircle
                  className="h-8 w-8 text-gray-700 hover:text-red-600 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <ProfileDropdown
                    name={name}
                    role={role}
                    email={email}
                    onClose={() => setShowDropdown(false)}
                  />
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-red-600 px-3 py-2">
                  Login
                </Link>
                <Link to="/signup" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
