
import mongoose, { Schema } from 'mongoose';

const patientSchema = new mongoose.Schema({
  _id:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  name: String, 
  phone: String,
  bloodGroup: String,
  address: String,
  note: String,
  requestForm: String, 
  confirmed: {
    type: Boolean,
    default: false, // Admin will update this to true
  },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
