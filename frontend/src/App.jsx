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


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/criteria" element={<Criteria />} />

            {/* Dashboards */}
            <Route path="/donordashboard" element={<DonorDashboard />} />
            <Route path="/patientdashboard" element={<PatientDashboard />} />
            <Route path="/admin" element={<AdminRoute> <AdminDashboard />  </AdminRoute> } />

            {/* Donor Registration Page */}
            <Route path="/registerdonor" element={<DonorRegistration />} />
            <Route path="/registerpatient" element={<PatientRegistration />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
