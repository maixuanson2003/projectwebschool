import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token not provide" });
    }
    const decodetoken = jwt.verify(token, process.env.JWT_KEY);
    if (!decodetoken) {
      return res.status(401).json({ success: false, message: "token invalid" });
    }
    const user = await User.findById({ _id: decodetoken._id }).select(
      "-password"
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "token not provide" });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export default verifyUser;
