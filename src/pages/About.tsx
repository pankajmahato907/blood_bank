import React from 'react';
import { Target, Users, Shield, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We are dedicated to saving lives through blood donation and ensuring
              a safe and sustainable blood supply for our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Blood Bank, our mission is to enhance lives through the power of blood
                donation. We strive to maintain a safe and reliable blood supply while
                providing exceptional service to our donors and healthcare partners.
              </p>
              <p className="text-gray-600">
                We believe that every person has the potential to make a difference in
                someone's life through blood donation. Our dedicated team works
                tirelessly to ensure that blood is available whenever and wherever it
                is needed.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80"
                alt="Blood Donation Center"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from donor care to blood processing.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We build strong relationships with our donors and healthcare partners.
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety</h3>
              <p className="text-gray-600">
                We maintain the highest standards of safety in blood collection and storage.
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600">
                We ensure blood is available 24/7 for patients in need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;