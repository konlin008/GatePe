import { deleteMedia, uploadMedia } from "../../utils/cloudinary.js";
import Event from "../../db/event.schema.js";
import { hashPassword } from "../../utils/password.js";
import GateMate from "../../db/gateMate.schema.js";
import { objectIdSchema } from "../../schemas/inputs.schema.js";
import { eventInputSchema } from "../../schemas/eventInput.schema.js";

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

    const files = req.files || {};
    if (files.image1 || files.image2) {
      if (files.image1) {
        const image1PublicId = event.imageUrlLandscape
          ?.split("/")
          .pop()
          .split(".")[0];
        if (image1PublicId) await deleteMedia(image1PublicId);

        const cloudeResImage1 = await uploadMedia(files.image1[0].path);
        event.imageUrlLandscape = cloudeResImage1.secure_url;
      }

      if (files.image2) {
        const image2PublicId = event.imageUrlPortrait
          ?.split("/")
          .pop()
          .split(".")[0];
        if (image2PublicId) await deleteMedia(image2PublicId);

        const cloudeResImage2 = await uploadMedia(files.image2[0].path);
        event.imageUrlPortrait = cloudeResImage2.secure_url;
      }
    }
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
    const { email, password, eventId } = req.body;
    const orgId = req.id;
    if (!email || !password || !eventId)
      return res.status(400).json({
        message: "All Fields are Required",
        success: false,
      });
    const existingUser = await GateMate.findOne({
      email,
      eventId,
      organizerId: orgId,
    });
    if (existingUser)
      return res.status(400).json({
        message: "GateMate already assigned to this event",
        success: false,
      });
    const hashedPassword = await hashPassword(password);

    const newMate = await GateMate.create({
      email,
      password: hashedPassword,
      eventId,
      organizerId: orgId,
    });
    if (newMate)
      return res.status(202).json({
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
export const getAllAssignedGateMate = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId)
      return res.status(400).json({ message: "Bad Request", success: false });
    const gateMates = await GateMate.find({ eventId }).select("-password");
    if (!gateMates) return res.status(202).json({});
    return res.status(200).json({
      gateMates,
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
export const removeGateMate = async (req, res) => {
  try {
    const { gateMateId } = req.params;
    if (!gateMateId)
      return res.status(400).json({ message: "Bad Request", success: false });
    const deletedMate = await GateMate.deleteOne({ _id: gateMateId });
    if (deletedMate.deletedCount === 1)
      return res.status(200).json({
        message: "GateMate Removed Succesfully",
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
export const availableGateMate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const organizerId = req.id;
    const availableGateMate = await GateMate.find({
      organizerId,
      $or: [{ eventId: { $ne: eventId } }, { eventId: { $exists: false } }],
    });
    if (!availableGateMate.length === 0)
      return res.status(200).json({
        message: "No GateMate Left To be Assigned",
        success: true,
      });
    return res.status(200).json({
      GateMates: availableGateMate,
      success: true,
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
    console.log(eventId, gateMateId);
    if (!eventId || !gateMateId)
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    const updatedGateMate = await GateMate.findByIdAndUpdate(
      gateMateId,
      {
        $addToSet: { eventIds: eventId },
      },
      { new: true },
    );
    if (updatedGateMate)
      return res.status(200).json({
        message: "GateMate Assigned",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server",
      success: false,
    });
  }
};
