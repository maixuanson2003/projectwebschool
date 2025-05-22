import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import { error } from "console";
import Department from "../models/Department.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });
const addEmployee = async (req, res) => {
    try {
        const {
            name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role,
        } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "user already registered in emp" });
        }
        const hasPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hasPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        })
        const userSave = await newUser.save();
        const newEmployee = new Employee({
            userId: userSave._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        })
        await newEmployee.save();
        return res.status(200).json({ success: true, message: "create success" });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, error: "failed" });

    }


}
const getEmployees = async (req, res) => {
    try {
        const Employees = await Employee.find().populate("userId").populate("department");
        return res.status(200).json({ success: true, employees: Employees })

    } catch (error) {
        return res.status(500).json({ success: false, error: "get list failed" });
    }
}
const getEmployeesById = async (req, res) => {
    try {
        const { id } = req.params;
        let Employees;
         Employees = await Employee.findById(id).populate("userId").populate("department");
         if(!Employees){
            Employees =await Employee.findOne({userId:id}).populate("userId",{password:0}).populate("department");
         }
        return res.status(200).json({ success: true, employees: Employees });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, error: "get list failed" });

    }


}
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body
        const employee = await Employee.findById({ _id: id })
        if (!employee) {
            console.log("empolyee not found");
            
            return res.status(404).json({ success: true, error: "not found" });
        }
        const user = await User.findById({ _id: employee.userId });
        if (!user) {
            console.log("user not found");
            
            return res.status(404).json({ success: true, error: "not found" });

        }
        const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name});
        const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
            maritalStatus,
            designation,
            salary,department
        })
        if (!updateUser || !updateEmployee){
            console.log("update failed");
            
            return res.status(404).json({success:false,error:"failed"});
        }
        return res.status(200).json({success:true,message:"success"});
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({ success: false, error: "get list failed" });

    }
}
const getEmployeeByDepId=async (req,res)=>{
    const { id } = req.params;
    try{
        const employees=await Employee.find({department:id})
        return res.status(200).json({success:true,employees:employees});
    }catch(error){
        return res.status(500).json({success:false,error:"failed"});
    }

}
export { addEmployee, upload, getEmployees, getEmployeesById,updateEmployee,getEmployeeByDepId }