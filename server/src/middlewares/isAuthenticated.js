import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({
        message: "Not Authenticated",
        success: false,
      });

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode)
      return res.status(401).json({
        message: "Invalid Token ",
        status: false,
      });
    req.id = decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export default isAuthenticated;
