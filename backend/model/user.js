import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["donor", "patient", "admin"], 
      default: "patient",                 
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
