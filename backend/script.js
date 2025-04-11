import express from 'express';
import cors from 'cors';
import connection from './connection/connection.js';
import User from './model/user.js';
import Donor from './model/donor.js'; // ✅ Import Donor model
import bcrypt from 'bcrypt';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body

// -------------------------
// 🔐 Login Route
// -------------------------
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const { password: userPassword, ...userData } = user._doc;
    console.log(userData);
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

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up", error: error.message });
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
// 🚀 Server Setup
// -------------------------
const port = 3000;
app.listen(port, async () => {
  await connection();
  console.log(`Server running on http://localhost:${port}`);
});
