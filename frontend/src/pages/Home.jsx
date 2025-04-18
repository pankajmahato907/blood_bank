
import { ArrowRight, Users, Heart, Award, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import BloodBankInfo from '../components/BloodBankInfo';


const Home = ({bankDetails}) => {

  return (
    <>
        <div>  
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80"
            alt="Blood Donation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-red-900/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">Hello everyone, Give the Gift of Life</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Your blood donation can save up to three lives. Join our mission to ensure
              every patient has access to safe, life-saving blood products.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Donate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10+</h3>
              <p className="text-gray-600">Donors Registered</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">5+</h3>
              <p className="text-gray-600">Lives Saved</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10+</h3>
              <p className="text-gray-600">Collection Centers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Here are the available Blood Bank Details</h2>
           <BloodBankInfo bankDetails = {bankDetails} />
        </div>
      </section>

     
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Soo Guys ,Are You Ready to Make a Difference? then 
          </h2>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Register as Donor
            </Link>
            <Link
              to="/contact"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>

  );
};

export default Home;