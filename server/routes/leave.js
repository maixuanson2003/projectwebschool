import express from 'express'
import auhtMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeaveListByEmployeeId } from '../controllers/leaveController.js';
const router=express.Router();
router.post("/add",addLeave)
router.get("/employee/:id",getLeaveListByEmployeeId)
// router.get("/employee/:id",getSalaryByEmployeeId)
export default router;