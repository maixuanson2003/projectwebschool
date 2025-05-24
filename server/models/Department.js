import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";
import User from "./User.js";
const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, require: true },
  description: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const Employees = await Employee.find({ department: this._id });
      const emplList = Employees.map((emp) => emp._id);
      const userList = Employees.map((emp) => emp.userId._id);
      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: emplList } });
      await Salary.deleteMany({ employeeId: { $in: emplList } });
      await User.deleteMany({ _id: { $in: userList } });
      next();
    } catch (error) {
      next(error);
    }
  }
);
const Department = mongoose.model("Department", departmentSchema);
export default Department;
