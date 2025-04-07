import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Digital Blood Bank</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-600 px-3 py-2">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 px-3 py-2">About Us</Link>
            <Link to="/criteria" className="text-gray-700 hover:text-red-600 px-3 py-2">Facts & Criteria</Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600 px-3 py-2">Contact</Link>
            <Link to="/login" className="text-gray-700 hover:text-red-600 px-3 py-2">Login</Link>
            <Link to="/signup" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
