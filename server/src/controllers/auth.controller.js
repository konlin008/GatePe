import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || firstName || lastName || password)
    return res.status(400).json({
      msg: "All fields are Required",
    });
  const hashedPassword = bcrypt.hash(password, 10);
  
};
