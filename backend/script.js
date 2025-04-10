import express from 'express';
import cors from 'cors';
import connection from './connection/connection.js';
import User from './model/user.js';
import bcrypt from 'bcrypt';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body


// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Remove password before sending user info
        const { password: userPassword, ...userData } = user._doc;

        // Login successful
        console.log(userData )
        res.json({ message: 'Login successful', user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Ensure role is either 'donor' or 'patient'
        if (!["donor","patient","admin"].includes(role)) {
            return res.status(400).json({ message: "Role must be either 'donor' or 'patient or admin'" });
        }

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
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
        console.error(error);  // Log error to console for debugging
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
});

// Server Setup
app.listen(3000, async () => {
    await connection();
    // await addAdmin();  // Ensure admin is added if none exists
    console.log('Server running on port 3000');
});
