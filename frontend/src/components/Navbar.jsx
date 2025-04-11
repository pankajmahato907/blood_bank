import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, UserCircle } from "lucide-react";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const Navigation = useNavigate();
  const { loggedIN,user } = useAuth();
  const handleNavigate = ()=>{
    console.log("hello")
      const role = user?.role;
      if(role === "admin"){
        Navigation("/adminProfile")
      }
      if(role === "patient"){
        Navigation("/patientProfile")
      }
      if(role === "donor"){
        Navigation("/donorProfile")
      }
      
  }

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Digital Blood Bank
            </span>
          </Link>
          <div className="flex items-center space-x-4">
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

            {/* Show Profile Icon if logged in, otherwise Login/Signup */}
            {loggedIN ? (
                <UserCircle className="h-16 w-16 text-gray-700 hover:text-red-600 px-3 py-2"  onClick={handleNavigate}/>
             
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
