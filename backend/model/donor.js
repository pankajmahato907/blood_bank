import mongoose, { Schema } from "mongoose";

const donorSchema = new mongoose.Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  name: { type: String },
  phone: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  address: { type: String },
  available: { type: Boolean, default: true },
}, { timestamps: true });

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
