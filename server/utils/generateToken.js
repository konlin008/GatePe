import jwt from "jsonwebtoken";

const generateToken = (userData) => {
  const token = jwt.sign(
    { id: userData._id, email: userData.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

export default generateToken;
