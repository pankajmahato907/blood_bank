
import { Heart, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <div className="flex justify-center md:justify-start items-center mb-4">
            <Heart className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold">Blood Bank</span>
          </div>
          <p className="text-gray-300">
            Saving lives through digital blood bank management and community service.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link to="/criteria" className="text-gray-300 hover:text-white">Criteria</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex justify-center md:justify-start items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+041560068</span>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>support@digitalbloodbank.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-8 border-t border-red-700 pt-4">
        <p className="text-gray-300">© 2025 Digital Blood Bank. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;