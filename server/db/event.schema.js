import mongoose, { model } from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: String,
    required: true,
  },
  ticketQuantity: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Org",
    required: true,
  },
  imageUrlLandscape: {
    type: String,
    required: true,
  },
  imageUrlPortrait: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Event", eventSchema);
