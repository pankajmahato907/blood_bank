import React from 'react';
import { Heart, Phone, Mail, Linkedin as BrandLinkedin, Twitter as BrandTwitter, Github as BrandGithub } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold">Blood Bank</span>
          </div>
          <p className="text-gray-300">
            Saving lives through efficient blood bank management and community service.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white">Blood Donation</Link></li>
            <li><Link to="/" className="text-gray-300 hover:text-white">Emergency Supplies</Link></li>
            <li><Link to="/" className="text-gray-300 hover:text-white">Blood Testing</Link></li>
            <li><Link to="/" className="text-gray-300 hover:text-white">Donor Management</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-white flex items-center">
                <BrandLinkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white flex items-center">
                <BrandTwitter className="h-5 w-5 mr-2" />
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white flex items-center">
                <BrandGithub className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+91-12225*****</span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>farazc60@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-red-800">
        <p className="text-center text-gray-300">
          © 2024 FARAZ Blood Services. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;