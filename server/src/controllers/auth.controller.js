import { registerSchema, loginSchema } from "../../schemas/auth.schema.js";
import User from "../../db/user.schema.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../../utils/generateAccessToke.js";
import generateRefreshToken from "../../utils/generateRefereshToken.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const errors = z.treeifyError(result.error).fieldErrors;
      return res.status(400).json({
        message: "Inavlid Input",
        errors,
      });
    }
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
      message: "Internal server Error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json({
        message: "Inavlid Input",
        error: result.error.flatten().fieldError,
      });
    const { email, password } = result.data;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const accessToken = generateAccessToken(user._id, user.id);
    const refreshToken = generateRefreshToken(user._id, user.role);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
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
      message: "Internal server Error",
    });
  }
};
export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired refresh token",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    const newRefreshToken = generateRefreshToken(user._id, user.role);
    const newAccessToken = generateAccessToken(user._id, user.role);
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    const isProd = process.env.NODE_ENV === "production";
    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
      })
      .json({
        message: "token updated",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    const userId = req.id;
    const isProd = process.env.NODE_ENV === "production";
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
      })
      .status(200)
      .json({
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const me = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        message: "user not found",
      });
    return res.status(200).json({
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
