import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import connection from './connection/connection.js';
import User from './model/user.js';
import Donor from './model/donor.js';
import Patient from './model/patient.js';
import upload from './middleware/upload.js';
import BloodBank from './model/bloodBank.js';
import ContactMessage from './model/ContactMessage.js';
import SendMail from './NodeMailer/SendMail.js';



const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


//contact us
app.post('/contact', async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, subject, message } = req.body;

    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    SendMail(email , message , subject , name);
    // Create a new contact message
    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });

   
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//  Login Route

app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const { password: _, ...userData } = user._doc;
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


app.post('/signup', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = req.body;

    if (!["donor", "patient", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be donor, patient or admin" });
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

    // Save only _id for Donor
    if (role === "donor") {
      const newDonor = new Donor({
        _id: newUser._id,
      });
      await newDonor.save();
    }

    // Save only _id for Patient
    if (role === "patient") {
      const newPatient = new Patient({
        _id: newUser._id,
      });
      await newPatient.save();
    }

    res.status(201).json({
      message: "User registered successfully!",
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
});



//  One-time Admin Creator

app.post('/create-admin', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: 'bloodbank123@gmail.com' });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

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
// Update password route
app.post('/update-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Failed to update password', error: error.message });
  }
});



//  Donor Registration

app.post('/donors/register', async (req, res) => {
  try {
    const { name, phone, gender, bloodGroup, address,email } = req.body;
    if (!name || !phone || !gender || !bloodGroup || !address || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDonor = new Donor({ name, phone, gender, bloodGroup, address,email });
    await newDonor.save();

    res.status(201).json({ message: "Donor registered successfully!", donor: newDonor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering donor", error: error.message });
  }
});

// Get individual donor by email
app.get('/donors/:email', async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();
    const donor = await Donor.findOne({ email });

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(donor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching donor", error: error.message });
  }
});



//  Get All Donors

app.get('/donors', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
});

// Get a single donor by ID
app.get('/donors/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching donor', error: err.message });
  }
});

// Update donor availability or info
app.put('/donors/:id', async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedDonor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ message: 'Donor updated successfully!', donor: updatedDonor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating donor', error: err.message });
  }
});

// delete
app.delete('/donors/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Donor.findByIdAndDelete(id);
    res.json({ message: 'Donor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete donor' });
  }
});


//  Get All Patient Requests

app.get('/patients/requests', async (req, res) => {
  try {
    const patientRequests = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patientRequests);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patient requests", error: error.message });
  }
});



// Patient Registration with File Upload

app.post('/patients/register', upload.single('requestForm'), async (req, res) => {
  try {
    const { _id, name, phone, bloodGroup, address, note } = req.body;
    const filePath = req.file ? req.file.path : null;

    // 1. Check if _id exists in Patient collection
    const existingPatient = await Patient.findById(_id);

    if (!existingPatient) {
      return res.status(404).json({ message: 'Patient ID not found. Cannot register details.' });
    }

    // 2. Update only if found
    existingPatient.name = name;
    existingPatient.phone = phone;
    existingPatient.bloodGroup = bloodGroup;
    existingPatient.address = address;
    existingPatient.note = note;
    if (filePath) existingPatient.requestForm = filePath;
    existingPatient.confirmed = false;

    await existingPatient.save();

    res.status(200).json({ message: 'Patient details updated successfully!', patient: existingPatient });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
});

// get patient form by id
app.get('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving patient', error: error.message });
  }
});


//  Update Patient Info / Confirm Request

app.put('/patients/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient updated", patient: updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
});


//  Delete Patient Request

app.delete('/patients/:id', async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient request deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
});

// Get all patient requests
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching patient requests', error: error.message });
  }
});

//add new blood bank 

app.post('/bloodbanks', async (req, res) => {
  try {
    const newBank = new BloodBank(req.body);
    await newBank.save();
    res.status(201).json(newBank);
  } catch (error) {
    res.status(500).json({ message: "Error creating blood bank", error: error.message });
  }
});

//Get all blood bank

app.get('/bloodbanks', async (req, res) => {
  try {
    const banks = await BloodBank.find();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blood banks", error: error.message });
  }
});

//Update bank

app.put('/bloodbanks/:id', async (req, res) => {
  try {
    const updated = await BloodBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating bank", error: error.message });
  }
});

//delete bank

app.delete('/bloodbanks/:id', async (req, res) => {
  try {
    await BloodBank.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bank", error: error.message });
  }
});

// Search donors by blood group and address
app.get('/search', async (req, res) => {
  try {
    const { bloodGroup, address } = req.query;

    const query = {};
    if (bloodGroup) {
      query.bloodGroup = { $regex: new RegExp(bloodGroup, 'i') };
    }
    if (address) {
      query.address = { $regex: new RegExp(address, 'i') };
    }

    const results = await Donor.find(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching donors', error: error.message });
  }
});


// Start Server

const port = 3000;
app.listen(port, async () => {
  await connection();
  console.log(`Server running at http://localhost:${port}`);
});
