import mongoose from 'mongoose';

const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connection;