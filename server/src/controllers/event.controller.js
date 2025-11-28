import { json } from "express";
import Event from "../../db/event.schema.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getEventsByCatagories = async (req, res) => {
  try {
    let { category, location } = req.query;
    location = location.toLowerCase();
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (!location) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }
    if (!category) {
      const events = await Event.find({
        city: location,
        date: { $gte: tomorrow },
      });
      if (!events || events.length === 0) {
        return res.status(202).json({
          message: `No Events Found in ${location}`,
          success: true,
        });
      }
      return res.status(200).json({
        events,
        success: true,
      });
    } else {
      const events = await Event.find({
        category,
        city: location,
        date: { $gte: tomorrow },
      });
      if (!events || events.length === 0) {
        return res.status(202).json({
          message: `No ${category} Events Found in ${location}`,
          success: true,
        });
      }
      return res.status(200).json({
        events,
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const getThisWeekEvent = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    const start = new Date();
    const end = new Date();
    const dayOfWeek = end.getDay();
    const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    end.setDate(end.getDate() + daysToSunday);
    end.setHours(23, 59, 59, 999);

    const events = await Event.find({
      city: location,
      date: { $gte: start, $lte: end },
    });

    if (!events || events.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No events found for this week at ${location}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const checkoutSessions = async (req, res) => {
  try {
    const { eventDetails } = req.body;
    const event = await Event.findById(eventDetails.eventId);
    if (event.availableTickets < eventDetails.quantity) {
      return res.status(400).json({
        success: false,
        message: "Not Enough Available",
      });
    }
    const sessions = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: eventDetails.eventName,
            },
            unit_amount: eventDetails.amount * 100,
          },
          quantity: eventDetails.quantity,
        },
      ],
      metadata: {
        eventId: eventDetails.eventId,
        eventName: eventDetails.eventName,
        quantity: eventDetails.quantity,
      },
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-cancel",
    });
    res.json({ url: sessions.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook Verfication Failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const eventId = session.metadata.eventId;
    const quantity = parseInt(session.metadata.quantity);

    try {
      const updatedEvent = await Event.findOneAndUpdate(
        {
          _id: eventId,
          availableTickets: { $gte: quantity },
        },
        {
          $inc: { availableTickets: -quantity },
        },
        {
          new: true,
        }
      );
      if (!updatedEvent) {
        await stripe.refunds.create({ payment_intent: session.payment_intent });
        console.log("Ticket Not Available Payment Refunded!");
        return res.status(200).send("Refunded due to insufficient tickets");
      } else {
        console.log(
          `Tickets reduced successfully: ${quantity} for event ${eventId}`
        );
      }
    } catch (error) {
      console.log("Error reducing tickets:", error);
    }
  }
  res.status(200).send({ received: true });
};
