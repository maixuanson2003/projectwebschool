import Leave from "../models/Leave.js";
const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body
        const newLeave = new Leave({
            employeeId: userId,
            leaveType,
            startDate,
            endDate,
            reason

        })
        await newLeave.save();
        return res.status(200).json({ success: true, message: "success add leave" });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ success: true, error: error.message })

    }
}
const getLeaveListByEmployeeId = async (req, res) => {
    try {
        const {id}=req.params;
        const Leaves= await Leave.find({employeeId:id})
        return res.status(200).json({success:true,leaves:Leaves});

    } catch (error) {
        return res.status(500).json({ success: true, error: error.message })

    }
}
export { addLeave,getLeaveListByEmployeeId }