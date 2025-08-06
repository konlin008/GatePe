import bcrypt from "bcrypt";
import Org from "../../db/org.schema.js";

export const orgRegister = async (req, res) => {
  try {
    const {
      ownerName,
      email,
      password,
      orgName,
      orgType,
      contactNo,
      city,
      logoUrl,
    } = req.body;
    if (
      !email ||
      !password ||
      !orgName ||
      !orgType ||
      !contactNo ||
      !city ||
      !logoUrl
    )
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
      ownerName,
      email,
      password: hashedPassword,
      orgName,
      orgType,
      contactNo,
      city,
      logoUrl,
    });
    if (newOrg)
      return res.status(200).json({
        success: true,
        message: "Registered Successfully",
        newOrg,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
