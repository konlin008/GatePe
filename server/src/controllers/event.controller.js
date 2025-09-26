import { json } from "express";
import Event from "../../db/event.schema.js";

export const getEventsByCatagories = async (req, res) => {
  try {
    const { category, location } = req.query;
    if (!category || !location) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }
    const events = await Event.find({ category, city: location });
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const getEventDetails = async (req, res) => {
  try {
    const eventId = req.params;
    if (!eventId)
      return res.status(400).json({
        success: false,
        message: "Event Id Needed",
      });
    const eventDetails = await Event.findById(eventId);
    if (!eventDetails)
      return res.status(404).json({
        success: false,
        message: "No Event Details Found",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
