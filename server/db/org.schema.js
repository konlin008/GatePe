import mongoose from "mongoose";

const orgSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  orgName: {
    type: String,
    required: true,
  },
  orgType: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Org", orgSchema);
