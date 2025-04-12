// patient.js (Model)
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String, 
  phone: String,
  bloodGroup: String,
  address: String,
  note: String,
  requestForm: String, // File path
  confirmed: {
    type: Boolean,
    default: false, // Admin will update this to true
  },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
