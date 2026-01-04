import GateMate from "../../db/gateMate.schema.js";
import Event from "../../db/event.schema.js";
import Ticket from "../../db/ticket.schema.js";
import mongoose from "mongoose";

export const fetchDetailsForGateMate = async (req, res) => {
  try {
    const { gateMateId } = req.params;
    if (!gateMateId)
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    const gateMate = await GateMate.findOne({ _id: gateMateId })
      .select("-password")
      .populate({ path: "eventId", select: "title date startTime endTime" });
    if (!gateMate)
      return res.status(404).json({
        message: "No GateMate Details Found",
        success: false,
      });
    return res.status(200).json({
      gateMate,
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
export const fetchEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId)
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    const eventDetails = await Event.findOne({ _id: eventId });
    if (!eventDetails)
      return res.status(404).json({
        message: "Invalid EventID",
        success: false,
      });
    return res.status(200).json({
      eventDetails,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};
export const verifyTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    if (!ticketId)
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({ message: "Invalid QR", success: false });
    }
    const checkedInTicketDetails = await Ticket.findOneAndUpdate(
      { _id: ticketId, status: { $ne: "CHECKED_IN" } },
      { status: "CHECKED_IN" },
      { new: true }
    );
    if (!checkedInTicketDetails)
      return res.status(400).json({
        message: "Ticket already checked in or invalid",
        success: false,
      });
    return res.status(200).json({
      message: "Ticket Verified",
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
