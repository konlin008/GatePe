import bcrypt from "bcrypt";
import Org from "../../db/org.schema.js";
import generateToken from "../../utils/generateToken.js";

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
          secure: false,
          sameSite: "Lax",
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
