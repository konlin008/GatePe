import jwt from "jsonwebtoken";

const generateRefreshToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export default generateRefreshToken;
