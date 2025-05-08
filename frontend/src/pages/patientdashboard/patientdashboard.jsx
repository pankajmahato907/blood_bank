import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import blooddonate from '../../assets/blooddonate.png'; 
import BloodBankInfo from '../../components/BloodBankInfo';

const PatientDashboard = ({bankDetails}) => {

  const isRegistered = localStorage.getItem("isPatientRegistered") === "true";
  const cards = [
    { title: 'Search Donor', color: 'bg-red-500', link: '/search-donor' },
    {
      title: isRegistered ? 'Patient Details' : 'Request Blood',
      color: 'bg-blue-500',
      link: isRegistered ? '/patientdetails' : '/registerpatient'
    },
    { title: 'All Donors', color: 'bg-green-500', link: '/donors' },
    { title: 'Blood Banks', color: 'bg-yellow-500', link: '/bloodbanks' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2"> 
      
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
          <BloodBankInfo bankDetails = {bankDetails}/>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
