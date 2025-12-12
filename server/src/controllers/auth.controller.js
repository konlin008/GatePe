import User from "../../db/user.schema.js";
import generateToken from "../../utils/generateToken.js";
export const register = async (req, res) => {
  try {
    const { email, name, picture } = req.body;
    if (!email || !name)
      return res.status(400).json({
        message: "All fields are Required",
      });
    const newUser = await User.create({
      name,
      email,
      profilePicture: picture,
    });
    if (newUser)
      return res.status(200).json({
        message: "User Registered Successfully",
        success: true,
        userData: newUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong Internal Server Issue",
    });
  }
};
export const check = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      return res.json({
        exists: false,
      });
    } else {
      const token = generateToken(existingUser);
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          exists: true,
          userData: existingUser,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong Internal Server Issue",
    });
  }
};
