import mongoose from "mongoose";

const orgSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
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
  logoUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Org", orgSchema);
