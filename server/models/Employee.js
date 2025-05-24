import mongoose, { Schema } from "mongoose";

import Leave from "./Leave.js";
import Salary from "./Salary.js";
import User from "./User.js";
const EmployeeSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
EmployeeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Leave.deleteMany({ employeeId: this._id });
      await Salary.deleteMany({ employeeId: this._id });
      await User.deleteOne({ _id: this.userId._id });
      next();
    } catch (error) {
      next(error);
    }
  }
);
const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
