import bcrypt from "bcrypt";
import prisma from "../../prisma/config/prismaClient.js";

export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password)
      return res.status(400).json({
        message: "All fields are Required",
      });
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser)
      return res.status(400).json({ message: "User Alredy Registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    if (newUser)
      return res
        .status(200)
        .json({ message: "User Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong Internal Server",
    });
  }
};
