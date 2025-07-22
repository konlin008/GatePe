import prisma from "../../prisma/config/prismaClient.js";

export const register = async (req, res) => {
  try {
    const { email, name, picture } = req.body;
    if (!email || !name)
      return res.status(400).json({
        message: "All fields are Required",
      });
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        profilePicture: picture,
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
export const check = async (req, res) => {
  const { email } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    return res.json({
      exists: false,
    });
  } else {
    return res.json({
      exists: true,
    });
  }
};
