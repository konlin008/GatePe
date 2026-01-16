import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export default generateToken;
