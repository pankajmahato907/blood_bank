import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import blooddonate from '../../assets/blooddonate.png'; // Your imported image

const PatientDashboard = () => {
  const cards = [
    { title: 'Search Donor', color: 'bg-red-500', link: '/search-donor' },
    { title: 'Request Blood', color: 'bg-blue-500', link: '/registerpatient' },
    { title: 'All Donors', color: 'bg-green-500', link: '/donors' },
    { title: 'Blood Banks', color: 'bg-yellow-500', link: '/blood-banks' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2">
      {/* Hero Image */}
      <div className="w-full mb-6">
        <img
          src={blooddonate}
          alt="Give the gift of blood"
          className="w-full h-52 sm:h-64 md:h-[300px] object-cover shadow-lg rounded-md"
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-2">
        {cards.map((card, idx) => (
          <Link
            to={card.link}
            key={idx}
            className={`${card.color} text-white py-8 rounded-lg shadow-md text-center text-lg font-semibold hover:scale-105 transition-transform duration-300`}
          >
            {card.title}
          </Link>
        ))}
      </div>

      {/* Blood Bank Details Section */}
      <section className="py-14 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Blood Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-red-900/90 p-6 rounded-lg text-white">
                <h3 className="text-xl font-semibold mb-4">Bhaktapur NRCS Blood Bank</h3>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    01-6611661, 01-6612266
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Bhaktapur, Nepal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
