import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const AddSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });
    await newSalary.save();
    return res.status(200).json({ success: true, message: "create success" });
  } catch (error) {
    return res.status(500).json({ success: true, error: "failed" });
  }
};
const getSalaryByEmployeeId = async (req, res) => {
  try {
    const { id } = req.params;
    let salary;
    salary = await Salary.find({ employeeId: id })
      .populate("employeeId")
      .sort({ createdAt: -1 });
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id })
        .populate("employeeId")
        .sort({ createdAt: -1 });
    }
    return res.status(200).json({ success: true, salarys: salary });
  } catch (error) {
    return res.status(500).json({ success: true, error: "failed" });
  }
};
export { AddSalary, getSalaryByEmployeeId };
