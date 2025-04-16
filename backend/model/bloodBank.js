import mongoose from 'mongoose';

const bloodBankSchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String,
});

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);
export default BloodBank;
