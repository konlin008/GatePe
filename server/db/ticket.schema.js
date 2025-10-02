const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["BOOKED", "PENDING", "CANCELLED", "CHECKED_IN"],
    default: "PENDING",
  },
  paymentId: {
    type: String,
    required: false,
  },
  qrCode: {
    type: String,
    required: false,
  },
  validTill: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Ticket", ticketSchema);
