import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Criteria = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Donation Criteria & Facts</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Learn about blood donation eligibility and important facts about blood donation.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Age</h3>
                    <p className="text-gray-600">Must be between 18-65 years old</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Weight</h3>
                    <p className="text-gray-600">Minimum 50kg (110 lbs)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Health</h3>
                    <p className="text-gray-600">Generally good health condition</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Hemoglobin Level</h3>
                    <p className="text-gray-600">Minimum 12.5g/dl</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Temporary Deferrals</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Surgery</h3>
                    <p className="text-gray-600">Wait 6 months after major surgery</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Pregnancy</h3>
                    <p className="text-gray-600">Wait 6 months after giving birth</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Facts</h2>
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Blood Types</h3>
                  </div>
                  <p className="text-gray-600">
                    There are 8 different blood types: A+, A-, B+, B-, O+, O-, AB+, and AB-. 
                    O- is the universal donor, while AB+ is the universal recipient.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Donation Frequency</h3>
                  </div>
                  <p className="text-gray-600">
                    You can donate whole blood every 56 days, up to 6 times a year. 
                    Platelet donors can give every 7 days, up to 24 times a year.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Blood Components</h3>
                  </div>
                  <p className="text-gray-600">
                    One blood donation can be separated into red cells, platelets, and plasma, 
                    potentially helping up to three different patients.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">Donation Process</h3>
                  </div>
                  <p className="text-gray-600">
                    The actual blood donation typically takes about 8-10 minutes. 
                    The entire process, from registration to post-donation refreshments, 
                    takes about one hour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Criteria;