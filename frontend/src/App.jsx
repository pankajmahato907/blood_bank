import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Criteria from './pages/Criteria';
import DonorDashboard from './pages/donordashboard/donordashboard';
import PatientDashboard from './pages/patientdashboard/patientdashboard';
import AdminRoute from './components/AdminRoute';
import DonorRegistration from './pages/donordashboard/donorRegistration';
import PatientRegistration from './pages/patientdashboard/patientregistration';
import AdminDashboard from './pages/admindashboard/admindashboard';
import AdminProfile from './components/Profiles/AdminProfile';
import PatientProfile from './components/Profiles/PatientProfile';
import DonorProfile from './components/Profiles/DonorProfile';
import AllDonors from './pages/patientdashboard/AllDonors';
import SearchDonor from './pages/patientdashboard/SearchDonor';
import AllBloodBank from './pages/patientdashboard/AllBloodBank';
import { useState , useEffect} from 'react';
import axios from 'axios'
import RequestList from './RequestList';
import AllPatientRequests from './pages/donordashboard/AllPatientRequests';
import Profile from './components/Profiles/Profile';

function App() {

  const [bankDetails, setBankDetails] = useState([]);
   useEffect(() => {
      axios.get('http://localhost:3000/bloodbanks')
        .then(res =>{
          setBankDetails(res.data)
        } )
        .catch(err => console.error("Error fetching blood banks:", err));
    }, []);

  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {console.log("From home page",bankDetails)}
        <Navbar />
        <main className="flex-grow mt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home bankDetails = {bankDetails} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/criteria" element={<Criteria />} />
            <Route path='/adminProfile' element = {<AdminProfile/>}/>
            <Route path='/patientProfile' element = {<PatientProfile/>}/>
            <Route path='/donorProfile' element = {<DonorProfile/>}/>

            {/* Dashboards */}
            <Route path="/donordashboard" element={<DonorDashboard />} />
            <Route path="/patientdashboard" element={<PatientDashboard bankDetails = {bankDetails} />} />
            <Route path="/admin" element={<AdminRoute> <AdminDashboard />  </AdminRoute> } />
            

            {/* Donor Registration Page */}
            <Route path="/registerdonor" element={<DonorRegistration />} />
            <Route path="/registerpatient" element={<PatientRegistration />} />
            <Route path="/donors" element={<AllDonors />} />
            <Route path="/search-donor" element={<SearchDonor />} />
            <Route path="/patientrequest" element={<AllPatientRequests/>} />
            <Route path="/bloodbanks" element={<AllBloodBank  bankDetails = {bankDetails}/>} />




            <Route path="/request" element={<RequestList/>} />
            <Route path="/profile" element={<Profile />}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;