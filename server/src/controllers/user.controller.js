import Event from "../../db/event.schema.js";
import Stripe from "stripe";
import Ticket from "../../db/ticket.schema.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import QRCode from "qrcode";
import OrganizerDetails from "../../db/org.schema.js";
import User from "../../db/user.schema.js";
import { OrganizerDetailsSchema } from "../../schemas/organizerDetails.schema.js";
import { cityName } from "../../schemas/inputs.schema.js";

export const getEventsByCity = async (req, res) => {
  try {
    let result = cityName.safeParse(req.query.city);
    if (!result.success) {
      const errors = result.error.issues;
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const city = result.data.toLocaleLowerCase();
    const events = await Event.find({ city });
    if (events.length === 0) return res.status(200).json({ events: [] });
    return res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getThisWeekEvent = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
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
        message: `No events found for this week at ${location}`,
      });
    }
    return res.status(200).json({
      data: events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const requestAsOrganizer = async (req, res) => {
  try {
    const id = req.id;
    const result = OrganizerDetailsSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues;
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const { fullName, organizerType, city, state, contactNo } = result.data;
    const existingRequest = await OrganizerDetails.findOne({ userId: id });

    if (existingRequest) {
      return res.status(409).json({
        message: "Organizer request already submitted",
      });
    }
    await OrganizerDetails.create({
      userId: id,
      fullName,
      organizerType,
      city,
      contactNo,
      state,
      status: "pending",
    });
    await User.findByIdAndUpdate(id, { organizerStatus: "pending" });
    return res.status(200).json({
      message: "Request Submitted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const checkoutSessions = async (req, res) => {
  try {
    const { eventDetails } = req.body;
    const userId = req.id;
    const event = await Event.findById(eventDetails.eventId);
    if (event.availableTickets < eventDetails.quantity) {
      return res.status(400).json({
        message: "Not Enough Available",
      });
    }
    const sessions = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      client_reference_id: userId,
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
      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        "http://localhost:5173/payment-cancel?session_id={CHECKOUT_SESSION_ID}",
    });
    res.json({ url: sessions.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log("Webhook Verfication Failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const eventId = session.metadata.eventId;
    const quantity = parseInt(session.metadata.quantity);
    const userId = session.client_reference_id;

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
        },
      );
      if (!updatedEvent) {
        await stripe.refunds.create({ payment_intent: session.payment_intent });
        console.log("Ticket Not Available Payment Refunded!");
        return res.status(200).send("Refunded due to insufficient tickets");
      } else {
        console.log(
          `Tickets reduced successfully: ${quantity} for event ${eventId}`,
        );
      }
      const ticket = await Ticket.create({
        eventId,
        userId,
        quantity,
        status: "BOOKED",
        paymentId: session.payment_intent,
      });
      const qrData = ticket._id.toString();
      const qrCode = await QRCode.toDataURL(qrData);
      ticket.qrCode = qrCode;
      await ticket.save();
    } catch (error) {
      console.log("Error reducing tickets:", error);
    }
  }
  res.status(200).send({ received: true });
};
