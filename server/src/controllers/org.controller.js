import { deleteMedia, uploadMedia } from "../../utils/cloudinary.js";
import Event from "../../db/event.schema.js";
import { hashPassword } from "../../utils/password.js";
import GateMate from "../../db/gateMate.schema.js";
import { objectIdSchema } from "../../schemas/inputs.schema.js";
import { eventInputSchema } from "../../schemas/eventInput.schema.js";
import User from "../../db/user.schema.js";
import { registerSchema } from "../../schemas/auth.schema.js";

export const listNewEvent = async (req, res) => {
  try {
    const orgId = req.id;
    const result = eventInputSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues;
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const {
      title,
      category,
      description,
      date,
      startTime,
      endTime,
      venue,
      city,
      location,
      deadline,
      ticketPrice,
      ticketQuantity,
    } = result.data;
    const files = req.files || {};
    const image1 = files.image1 ? files.image1[0] : null;
    const image2 = files.image2 ? files.image2[0] : null;
    let image1Url;
    let image2Url;

    if (image1 && image2) {
      const cloudeResImage1 = await uploadMedia(image1.path);
      image1Url = cloudeResImage1.secure_url;

      const cloudeResImage2 = await uploadMedia(image2.path);
      image2Url = cloudeResImage2.secure_url;
    }

    const newEvent = await Event.create({
      title,
      category,
      description,
      date,
      startTime,
      endTime,
      deadline,
      venue,
      city,
      location,
      ticketPrice,
      ticketQuantity,
      availableTickets: ticketQuantity,
      imageUrlLandscape: image1Url,
      imageUrlPortrait: image2Url,
      organizerId: orgId,
    });
    if (newEvent)
      return res.status(200).json({
        success: true,
        message: "Event Listed Successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};
export const getEventsByOrgId = async (req, res) => {
  try {
    const orgId = req.id;
    const events = await Event.find({
      organizerId: orgId,
    });
    if (events?.length === 0)
      return res.status(202).json({
        message: "No Event Listed",
        success: true,
      });
    return res.status(202).json({
      success: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};
export const getEventDetails = async (req, res) => {
  try {
    const idResult = objectIdSchema.safeParse(req.params.id);
    if (!idResult.success) {
      return res.status(400).json({
        message: idResult.error.issues[0].message,
        success: false,
      });
    }
    const eventDetails = await Event.findOne({ _id: idResult.data });
    if (!eventDetails)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
      });
    return res.status(200).json({
      eventDetails,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error ",
      success: false,
    });
  }
};
export const updateEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
      });
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        event[key] = req.body[key];
      }
    });
    await event.save();
    return res.status(200).json({
      message: "Event Details updated successfully",
      success: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
export const assignGateMate = async (req, res) => {
  try {
    const { name, email, password, eventId } = req.body;
    const registerSchemaResult = registerSchema.safeParse(req.body);
    if (!registerSchemaResult.success) {
      return res.status(400).json({
        errors: registerSchemaResult.error.issues,
      });
    }

    const result = objectIdSchema.safeParse(eventId);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }
    const parsedEventId = result.data;
    const orgId = req.id;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const event = await Event.findById(parsedEventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    let gateMate = await User.findOne({ email });

    if (gateMate) {
      const alreadyAssigned = event.gateMates.includes(gateMate._id);
      if (alreadyAssigned) {
        return res.status(400).json({
          success: false,
          message: "GateMate already assigned to this event",
        });
      }
    } else {
      const hashedPassword = await hashPassword(password);

      gateMate = await User.create({
        name,
        email,
        password: hashedPassword,
        organizer: orgId,
        role: "gateMate",
      });
    }

    await Event.findByIdAndUpdate(parsedEventId, {
      $addToSet: { gateMates: gateMate._id },
    });

    return res.status(201).json({
      success: true,
      message: "GateMate assigned successfully",
      gateMateId: gateMate._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllAssignedGateMate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventResult = objectIdSchema.safeParse(eventId);
    if (!eventResult.success) {
      return res.status(400).json({
        message: "Invalid EventId",
      });
    }
    const parsedEventId = eventResult.data;
    const event = await Event.findById(parsedEventId)
      .populate({
        path: "gateMates",
        select: "name role email",
      })
      .select("gateMates");
    if (!event?.gateMates) return res.status(202).json([]);
    return res.status(200).json({
      gateMates: event.gateMates,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const removeGateMate = async (req, res) => {
  try {
    const { eventId, gateMateId } = req.params;

    const eventResult = objectIdSchema.safeParse(eventId);
    if (!eventResult.success) {
      return res.status(400).json({
        message: "Invalid EventId",
      });
    }

    const gateMateResult = objectIdSchema.safeParse(gateMateId);
    if (!gateMateResult.success) {
      return res.status(400).json({
        message: "Invalid GateMateId",
      });
    }

    const parsedEventId = eventResult.data;
    const parsedGateMateId = gateMateResult.data;
    const deletedMate = await Event.findByIdAndUpdate(
      parsedEventId,
      {
        $pull: {
          gateMates: parsedGateMateId,
        },
      },
      {
        new: true,
      },
    );
    await User.findOneAndUpdate(
      { _id: gateMateId, role: "gateMate" },
      { role: "user" },
    );
    if (!deletedMate) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (deletedMate)
      return res.status(200).json({
        message: "GateMate Removed Succesfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const availableGateMate = async (req, res) => {
  try {
    const organizerId = req.id;
    const availableGateMate = await User.find({
      organizer: organizerId,
      role: "gateMate",
    });
    return res.status(200).json({
      GateMates: availableGateMate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server",
      success: false,
    });
  }
};
export const addExistingMateToEvent = async (req, res) => {
  try {
    const { eventId, gateMateId } = req.body;
    const eventResult = objectIdSchema.safeParse(eventId);
    if (!eventResult.success) {
      return res.status(400).json({
        message: "Invalid EventId",
      });
    }

    const gateMateResult = objectIdSchema.safeParse(gateMateId);
    if (!gateMateResult.success) {
      return res.status(400).json({
        message: "Invalid GateMateId",
      });
    }

    const parsedEventId = eventResult.data;
    const parsedGateMateId = gateMateResult.data;
    const existingGateMate = await Event.exists({
      _id: parsedEventId,
      gateMates: { $in: [parsedGateMateId] },
    });
    if (existingGateMate) {
      return res.status(409).json({
        message: "GateMate Already Assigned to This Event",
      });
    } else {
      const updatedEvent = await Event.findByIdAndUpdate(parsedEventId, {
        $addToSet: { gateMates: parsedGateMateId },
      });
      if (updatedEvent)
        return res.status(200).json({
          message: "GateMate Assigned Successfully",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server",
      success: false,
    });
  }
};
