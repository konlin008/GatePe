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
