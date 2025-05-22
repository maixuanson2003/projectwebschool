import Department from "../models/Department.js";
const addDepartment=async (req,res)=>{
    try{
        const {dep_name,description}=req.body;
        const newDepartment=new Department({
            dep_name,
            description
        })
        await newDepartment.save();
        return res.status(200).json({success:true,department:newDepartment});


    }catch(error){
        return res.status(500).json({success:false,error:"faile to add"})
    }

}
const getDepartment=async (req,res)=>{
    try{
        const Departments=await Department.find();
        return res.status(200).json({success:true,departments:Departments});
    }catch(error){
        return res.status(500).json({success:false,error:"failed to add"});
    }
}
const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params; 
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json(department);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Failed to fetch department" });
    }
};
 const updateDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { dep_name, description }
        );

        if (!updatedDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, department: updatedDepartment });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ success: false, error: "Failed to update department" });
    }
};
 const deleteDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await Department.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ success: false, error: "Failed to delete department" });
    }
};


export {addDepartment,getDepartment,getDepartmentById,updateDepartmentById,deleteDepartmentById}