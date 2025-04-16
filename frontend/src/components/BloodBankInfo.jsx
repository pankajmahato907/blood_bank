import React from 'react'
import { Phone, MapPin } from 'lucide-react';

function BloodBankInfo({ bankDetails }) {
  return (
    <div className="flex flex-row gap-10 flex-wrap justify-around">
      {console.log("from blood bank", bankDetails)}
      {bankDetails.map((item, index) => (
        <div
          key={index}
          className="bg-red-900/90 p-6 rounded-lg text-white w-72" // 👈 equal width
        >
          <h3 className="text-xl font-semibold mb-4">{item.name}</h3>
          <div className="space-y-3">
            <p className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              {item.phone}
            </p>
            <p className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {item.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BloodBankInfo;
