import Ticket from "../../db/ticket.schema.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import mongoose from "mongoose";

export const ticketDetails = async (req, res) => {
  try {
    const userId = req.id;
    console.log(userId);
    const sessionId = req.params.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent;
    const ticketDetails = await Ticket.findOne({ paymentId, userId })
      .select("-userId -__v")
      .populate(
        "eventId",
        "title location startTime endTime imageUrlPortrait date"
      );
    if (!ticketDetails)
      return res.status(404).json({
        message: "No Ticket Found",
        success: false,
      });
    return res.status(200).json({
      ticketDetails,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const getCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    res.json({
      success: true,
      status: session.payment_status,
      paymentIntentId: session.payment_intent?.id || null,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
export const ticketDetailsForGateMate = async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.ticketId) ||
      !mongoose.Types.ObjectId.isValid(req.params.eventId)
    ) {
      return res.status(400).json({ message: "Invalid QR", success: false });
    }
    const { ticketId, eventId } = req.params;
    const ticketDetails = await Ticket.findOne({
      _id: ticketId,
      eventId,
    })
      .select("-paymentId")
      .populate("userId", "name");
    if (!ticketDetails) {
      message: "Invalid Ticket or Wrong Event";
      success: false;
    }
    return res.status(200).json({
      ticketDetails,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
