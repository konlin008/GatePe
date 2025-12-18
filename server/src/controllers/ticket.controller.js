import express from "express";
import Ticket from "../../db/ticket.schema.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const ticketDetails = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentId = session.payment_intent;
    const ticketDetails = await Ticket.findOne({ paymentId })
      .select("-userId -__v")
      .populate("eventId", "title location startTime endTime imageUrlPortrait");
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
