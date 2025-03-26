import express from 'express';
import cors from 'cors';
import connection from './connection/connection.js';
import User from './model/user.js';
const app = express();
import bcrypt from "bcrypt"

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body


    app.post('/login', async (req, res) => {
        try {
          const { email, password } = req.body;
      
          const user = await User.findOne({ email });
          if (!user) return res.status(400).json({ message: 'User not found' });
      
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      
          res.json({ message: 'Login successful' });
        } catch (error) {
          res.status(500).json({ message: 'Error logging in', error });
        }
      });

      app.post("/signup", async (req, res) => {
        try {
          const { firstName, lastName, email, password, role = "user" } = req.body; // ✅ Set default role here
      
          // ✅ Check if all fields are provided
          if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
          // ✅ Check if email already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
          }
      
          // ✅ Hash the password before saving
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // ✅ Create new user with default role
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
          res.status(500).json({ message: "Error signing up", error: error.message });
        }
      });
      
app.listen(3000, async() => {
    await connection()
  console.log('Server running on port 3000');
});