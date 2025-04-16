import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    address: { type: String, required: true },
    available: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
