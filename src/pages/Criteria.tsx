import React from 'react';

const Criteria = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <section className="bg-red-600 text-white py-12 text-center shadow-md">
        <h1 className="text-4xl font-bold">Donation Criteria & Facts</h1>
        <p className="text-lg mt-2">Learn about blood donation eligibility and important facts about blood donation.</p>
      </section>

      <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 border-b-2 pb-2">Eligibility Criteria</h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li><strong>Age:</strong> Must be between 18-65 years old</li>
          <li><strong>Weight:</strong> Minimum 50kg (110 lbs)</li>
          <li><strong>Health:</strong> Generally good health condition, free from chronic diseases</li>
          <li><strong>Hemoglobin Level:</strong> Minimum 12.5g/dl</li>
          <li><strong>Blood Pressure:</strong> Should be within a normal range (not too high or too low)</li>
          <li><strong>Recent Vaccination:</strong> Wait at least 2 weeks after receiving a vaccine</li>
          <li><strong>Medication:</strong> Some medications may temporarily disqualify donation; consult a doctor</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 border-b-2 pb-2">Temporary Deferrals</h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li><strong>Recent Surgery:</strong> Wait 6 months after major surgery</li>
          <li><strong>Pregnancy:</strong> Wait 6 months after giving birth</li>
          <li><strong>Tattoo/Piercing:</strong> Wait at least 6 months before donating</li>
          <li><strong>Infections:</strong> Must be free from cold, flu, or other infections for at least 2 weeks</li>
          <li><strong>Travel History:</strong> If you have traveled to malaria-risk areas, you may need to wait before donating</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 border-b-2 pb-2">Important Facts</h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li><strong>Blood Types:</strong> There are 8 different blood types. O- is the universal donor, while AB+ is the universal recipient.</li>
          <li><strong>Donation Frequency:</strong> Whole blood can be donated every 56 days, while platelets can be donated every 7 days.</li>
          <li><strong>Blood Components:</strong> One donation can help up to three different patients by separating red cells, platelets, and plasma.</li>
          <li><strong>Donation Process:</strong> The actual blood donation takes about 8-10 minutes, while the entire process takes about an hour.</li>
          <li><strong>Uses of Donated Blood:</strong> Blood is used for trauma patients, surgeries, cancer treatments, and chronic conditions like anemia.</li>
          <li><strong>Safe Donation:</strong> Sterile, single-use needles are used for each donor, ensuring complete safety.</li>
          <li><strong>Hydration & Nutrition:</strong> Donors are encouraged to eat a healthy meal and drink plenty of water before donating.</li>
        </ul>
      </section>
    </div>
  );
};

export default Criteria;