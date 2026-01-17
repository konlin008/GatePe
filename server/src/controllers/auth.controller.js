import { registerSchema, loginSchema } from "../../schemas/auth.schema.js";
import User from "../../db/user.schema.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../../utils/generateAccessToke.js";
import generateRefreshToken from "../../utils/generateRefereshToken.js";

export const register = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: "Inavlid Input",
        error: result.error.flatten().fieldError,
      });
    const { email, password, name } = result.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User Registered Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: "Inavlid Input",
        error: result.error.flatten().fieldError,
      });
    const { email, password } = result.data;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);
    const isProd = process.env.NODE_ENV === "production";
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
