import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { loginSchema } from "../validator/Login.js";
const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Not match Found" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "15m" }
    );
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const verifyUser = async (req, res) => {
  console.log(req.user);

  return res.status(200).json({ success: true, user: req.user });
};
export { login, verifyUser };
