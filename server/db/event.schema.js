import mongoose, { model } from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    reuired: true,
  },
  description: {
    type: String,
    reuired: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    reuired: true,
  },
  venue: {
    type: String,
    reuired: true,
  },
  adress: {
    type: String,
    reuired: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Event", eventSchema);
