import bcrypt from "bcrypt";
import Org from "../../db/org.schema.js";
import generateToken from "../../utils/generateToken.js";
import { deleteMedia, uploadMedia } from "../../utils/cloudinary.js";
import Event from "../../db/event.schema.js";

export const orgRegister = async (req, res) => {
  try {
    const { email, password, orgName, orgType, contactNo, city } = req.body;
    if (!email || !password || !orgName || !orgType || !contactNo || !city)
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    const org = await Org.findOne({ email });
    if (org)
      return res
        .status(400)
        .json({ success: false, message: "Email Already Registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newOrg = await Org.create({
      email,
      password: hashedPassword,
      orgName,
      orgType,
      contactNo,
      city,
    });
    const org_data = await Org.findById(newOrg._id).select("-password");
    return res.status(200).json({
      success: true,
      message: "Organizer Registered Successfully",
      org_data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
export const orgLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }
    const org = await Org.findOne({ email });
    if (!org)
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    else {
      const token = generateToken(org);
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          org,
          success: true,
          message: `welcome ${org?.orgName}`,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const listNewEvent = async (req, res) => {
  try {
    const orgId = req.id;
    const {
      title,
      catagory,
      description,
      date,
      time,
      duration,
      venue,
      city,
      adress,
      deadline,
      ticketPrice,
      ticketQuantity,
    } = req.body;

    const files = req.files || {};
    const image1 = files.image1 ? files.image1[0] : null;
    const image2 = files.image2 ? files.image2[0] : null;

    if (
      !title ||
      !catagory ||
      !description ||
      !date ||
      !time ||
      !duration ||
      !venue ||
      !city ||
      !adress ||
      !deadline ||
      !image1 ||
      !image2 ||
      !ticketPrice ||
      !ticketQuantity
    )
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    const cloudeResImage1 = await uploadMedia(image1.path);
    const image1Url = cloudeResImage1.secure_url;

    const cloudeResImage2 = await uploadMedia(image2.path);
    const image2Url = cloudeResImage2.secure_url;

    const newEvent = await Event.create({
      title,
      category: catagory,
      description,
      date,
      time,
      duration,
      deadline,
      venue,
      city,
      adress,
      ticketPrice,
      ticketQuantity,
      imageUrlLandscape: image1Url,
      imageUrlPortrait: image2Url,
      organizer: orgId,
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
    const events = await Event.find({ organizer: orgId });
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
    const eventId = req.params.id;
    const eventDetails = await Event.findOne({ _id: eventId });
    if (!eventDetails)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
      });
    return res.status(202).json({
      eventDetails,
      success: false,
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
