import mongoose from "mongoose";
import Employee from "./Employee.js";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
  profileImage: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Employee.deleteOne({ userId: this._id });
      next();
    } catch (error) {
      next(error);
    }
  }
);
const User = mongoose.model("User", userSchema);
export default User;
