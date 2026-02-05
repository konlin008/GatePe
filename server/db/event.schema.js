import mongoose, { model } from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
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
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  ticketQuantity: {
    type: Number,
    required: true,
  },
  availableTickets: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Org",
    required: true,
  },
  gateMates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  imageUrlLandscape: {
    type: String,
    default: "",
  },
  imageUrlPortrait: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Event", eventSchema);
