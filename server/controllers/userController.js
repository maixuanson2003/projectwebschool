import User from "../models/User.js";
const getUserList = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (!user) {
      return res.status(400).json({ success: false, error: "user not found" });
    }
    return res.status(200).json({ success: true, users: user });
  } catch (error) {
    return res.status(500).json({ success: false, error: "failed" });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, error: "user not found" });
    }
    return res.status(200).json({ success: true, users: user });
  } catch (error) {
    return res.status(500).json({ success: false, error: "failed" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const { name, email, role } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ success: false, error: "user not found" });
    }
    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    return res.status(200).json({ success: true, message: "update success" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, error: "failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ success: false, error: "user not found" });
    }
    await user.deleteOne();
    return res.status(200).json({ success: true, message: "delete success" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "failed" });
  }
};
export { updateUser, deleteUser, getUserList, getUserById };
