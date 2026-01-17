import jwt from "jsonwebtoken";

const generateAccessToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
  return token;
};

export default generateAccessToken;
