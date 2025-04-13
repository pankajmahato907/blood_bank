import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from './model/user.js';
import Donor from './model/donor.js';
import Patient from './model/patient.js';
import upload from './middleware/upload.js';

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bloodbank');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

// -------------------------
// 🔐 Login Route
// -------------------------
app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log("Login attempt:", email);

    // Trim and lowercase email to match DB format
    email = email.trim().toLowerCase();
    console.log("Processed email for DB query:", email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const { password: userPassword, ...userData } = user._doc;
    res.json({ message: 'Login successful', user: userData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


// -------------------------
// 📝 Signup Route
// -------------------------
app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!["donor", "patient", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be either 'donor', 'patient' or 'admin'" });
    }

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
});

// 👑 One-time Admin Creator Route
// -------------------------
app.post('/create-admin', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: 'bloodbank123@gmail.com' });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      firstName: 'Blood',
      lastName: 'Bank',
      email: 'bloodbank123@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin user created successfully!', admin });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Failed to create admin', error: error.message });
  }
});

// -------------------------
// 🩸 Donor Registration Route
// -------------------------
app.post('/donors/register', async (req, res) => {
  try {
    const { name, phone, gender, bloodGroup, address } = req.body;
    if (!name || !phone || !gender || !bloodGroup || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDonor = new Donor({ name, phone, gender, bloodGroup, address });
    await newDonor.save();

    res.status(201).json({ message: "Donor registered successfully!", donor: newDonor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering donor", error: error.message });
  }
});

// -------------------------
// 📋 Get All Donors Route
// -------------------------
app.get('/donors', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
});

// -------------------------
// 📋 Get All Patient Requests Route
// -------------------------
app.get('/patients/requests', async (req, res) => {
  try {
    const patientRequests = await Patient.find({ confirmed: false }).sort({ createdAt: -1 });
    res.status(200).json(patientRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patient requests", error: error.message });
  }
});

// -------------------------
// 🏥 Patient Registration Route with File Upload
// -------------------------
app.post('/patients/register', upload.single('requestForm'), async (req, res) => {
  try {
    const { name, phone, bloodGroup, address, note } = req.body;
    const filePath = req.file ? req.file.path : null;

    const newPatient = new Patient({
      name,
      phone,
      bloodGroup,
      address,
      note,
      requestForm: filePath,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully!', patient: newPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering patient', error: error.message });
  }
});

// -------------------------
// 🚀 Server Setup
// -------------------------
const port = 3000;
app.listen(port, async () => {
  await connection();
  console.log(`Server running on http://localhost:${port}`);
});
