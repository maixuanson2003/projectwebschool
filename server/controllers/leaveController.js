import path from "path";
import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import { addLeaveSchema } from "../validator/Leave.js";
const addLeave = async (req, res) => {
  const { error } = addLeaveSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const Employ = await Employee.findOne({ userId: userId });
    const newLeave = new Leave({
      employeeId: Employ._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res
      .status(200)
      .json({ success: true, message: "success add leave" });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ success: true, error: error.message });
  }
};
const getLeaveListByEmployeeId = async (req, res) => {
  try {
    const { id } = req.params;
    const Employ = await Employee.findOne({ userId: id });
    let Leaves;
    if (!Employ) {
      Leaves = await Leave.find({ employeeId: id });
    } else {
      Leaves = await Leave.find({ employeeId: Employ._id });
    }
    return res.status(200).json({ success: true, leaves: Leaves });
  } catch (error) {
    return res.status(500).json({ success: true, error: error.message });
  }
};
const getLeaveList = async (req, res) => {
  try {
    const Leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    return res.status(200).json({ success: true, leaves: Leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const Leaves = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
          select: "profileImage",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves: Leaves });
  } catch (error) {
    return res.status(500).json({ success: true, error: error.message });
  }
};
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("sss");

    const leaves = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leaves) {
      console.log(leaves);

      return res.status(404).json({ success: false, message: "not found" });
    }
    return res.status(200).json({ success: true, message: "update success" });
  } catch (error) {
    return res.status(500).json({ success: true, error: error.message });
  }
};

export {
  addLeave,
  getLeaveListByEmployeeId,
  getLeaveList,
  getLeaveDetail,
  updateLeave,
};
